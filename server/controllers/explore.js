const ObjectId = require("mongoose").Types.ObjectId;
const jwt = require("jsonwebtoken");

const { Query, Question, User, Code } = require("../DataBase/database");

const queryQueueDir = `../CodeExecuter/queryQueue${
  process.env.NO_REDIS ? "_noredis" : ""
}`;
const { addQueryToQueue } = require(queryQueueDir);

const { createFile } = require("../utils/file");
const { dateTimeNowFormated, logger } = require("../utils/logging");

// ObjectID Validator function
function isValidObjectId(id) {
  return ObjectId.isValid(id) && String(new ObjectId(id)) === id;
}

const problemsController = async (req, res) => {
  try {
    const questions = await Question.getQuestionList();
    return res.status(200).json(questions);
  } catch (error) {
    logger.error(error, dateTimeNowFormated());
    return res.status(400).json(error);
  }
};

const detailedProblemController = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id))
      return res.status(404).json("not a valid object id");

    const question = await Question.getQuestionById(id);
    if (!question) return res.status(404).json("id does not exists");
    return res.status(200).json(question);
  } catch (error) {
    logger.error(error, dateTimeNowFormated());
    return res.status(400).json(error);
  }
};

const validLanguages = ["c", "cpp", "py", "js", "java"];

const verdictController = async (req, res) => {
  try {
    const { buggyCode, quesName } = req.body; // No language field
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ msg: "Unauthorized: No token provided" });
    }

    let userId;
    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      userId = verified.user;
    } catch (error) {
      return res.status(401).json({ msg: "Unauthorized: Invalid token" });
    }

    if (!buggyCode) {
      return res.status(400).json({ msg: "Error: Code submission is empty" });
    }

    // Update user's submissions map with the latest buggyCode for the question
    try {
      const updatedUser = await User.findOneAndUpdate(
        userId,
        quesName,
        buggyCode
      );

      return res.status(200).json({
        msg: "Submission updated successfully",
        submissions: updatedUser.submissions,
      });
    } catch (error) {
      console.error("Database error:", error);
      return res
        .status(500)
        .json({ msg: "Database error", error: error.message });
    }
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ msg: "Server error", error: error.message });
  }
};

// const verdictController = async (req, res) => {
//   try {
//     const { buggyCode, quesName, language = "" } = req.body;
//     const token = req.cookies.token;

//     if (!token) {
//       return res.status(401).json({ msg: "Unauthorized: No token provided" });
//     }

//     try {
//       const verified = jwt.verify(token, process.env.JWT_SECRET);
//       const userId = verified.user;

//       // Update user's submissions map with the latest buggyCode for the question
//       const updatedUser = await User.findByIdAndUpdate(
//         userId,
//         { $set: { [`submissions.${quesName}`]: buggyCode } },
//         { new: true, upsert: true }
//       );

//       return res.status(200).json({
//         msg: "Submission updated successfully",
//         submissions: updatedUser.submissions,
//       });
//     } catch (error) {
//       return res.status(401).json({ msg: "Unauthorized: Invalid token" });
//     }
//   } catch (error) {
//     console.error("Error storing submission:", error);
//     return res.status(500).json({
//       msg: "Server error: Unable to store submission",
//       error: error.message,
//     });
//   }
// };

// const verdictController = async (req, res) => {
//     try {
//         const { language, code, testcase, quesName } = req.body;
//         const quesId = req.params.id;

//         if (!validLanguages.includes(language))
//             return res.status(400).json({ msg: 'Please select a language / valid language !' });

//         // user specific details update
//         let username = 'guest';
//         const token = req.cookies.token;
//         if (token) {
//             try {
//                 const verified = jwt.verify(token, process.env.JWT_SECRET);
//                 const user = await User.incrTotalSubmInUser(verified.user);
//                 username = user.username;
//             } catch {
//                 username = 'guest';
//             }
//         }

//         const { filename } = createFile(language, code);
//         const codeDoc = await Code.createNewCode({ language, code, username });
//         const query = await Query.createNewQuery({ language, filepath: filename, testcase, quesId, quesName, username, codeId: codeDoc._id });

//         await addQueryToQueue(query, true); // this will async now

//         await Question.incrNoOfSubm(quesId);

//         res.status(201).json({ status: 'pending', msg: "Request queued, wait for response !", queryId: query._id });
//     } catch (error) {
//         logger.error(error, dateTimeNowFormated());
//         return res.status(400).json({ status: 'error', msg: 'some error occured submitting the code !', error: JSON.stringify(error) });
//     }
// }

const statusController = async (req, res) => {
  const queryId = req.params.queryId;
  if (!isValidObjectId(queryId))
    return res.status(404).json({ msg: "not a valid object id" });
  let query = null;
  try {
    query = await Query.getQueryById(queryId);
    if (!query) {
      return res
        .status(404)
        .json({ msg: "invalid queryId or this query has been deleted !" });
    }
    res.status(200).json(query);
    if (
      query.type === "exec" &&
      (query.status === "success" || query.status === "error")
    )
      await Query.deleteQueryById(queryId);
  } catch (error) {
    logger.error(error, dateTimeNowFormated());
    res.status(400).json({ msg: "on error", error: JSON.stringify(error) });
  }
};

const leaderboardController = async (req, res) => {
  try {
    const leaders = await Query.getAllQueriesReverseSorted();
    return res.status(200).json(leaders);
  } catch (error) {
    logger.error(error, dateTimeNowFormated());
    return res.status(400).json(error);
  }
};

const codesController = async (req, res) => {
  try {
    const codeId = req.params.codeId;
    const code = await Code.getCodeById(codeId);
    if (!code)
      return res.status(404).json({
        error: "filename does not exists / yet exists or is deleted !",
      });
    res.status(200).json({ code: code.code, language: code.language });
  } catch (error) {
    logger.error(error, dateTimeNowFormated());
    res.status(400).json({ error: JSON.stringify(error) });
  }
};

const invalidLanguage = `Please select a language / valid language.
Or may be this language is not yet supported !`;

const codeExecutor = async (req, res) => {
  try {
    const { language, code, input } = req.body;

    if (!validLanguages.includes(language))
      return res.status(400).json({ msg: invalidLanguage });

    const { filepath } = createFile(language, code);
    const query = await Query.createNewQuery({
      type: "exec",
      filepath,
      language,
      input,
    });

    addQueryToQueue(query, false);

    res.status(201).json({
      status: "pending",
      msg: "Request queued, wait for response !",
      queryId: query._id,
    });
  } catch (error) {
    logger.error(error, dateTimeNowFormated());
    return res.status(400).json({
      status: "error",
      msg: "some error occured submitting the code !",
      error: JSON.stringify(error),
    });
  }
};

module.exports = {
  codesController,
  statusController,
  verdictController,
  problemsController,
  leaderboardController,
  detailedProblemController,
  codeExecutor,
};
