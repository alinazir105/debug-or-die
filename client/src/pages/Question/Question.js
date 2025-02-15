import React, { Fragment, useRef, useState, useEffect } from "react";
import { useParams } from "react-router";

import classes from "./Question.module.css";
import CodeEditorv3 from "./Editor/CodeEditorv3";
import ButtonCustom from "../../compenents/Button/Button";
import useLocalStorage from "../../hooks/useLocalStorage";
import LoadingSpinner from "../../compenents/LoadingSpinner/LoadingSpinner";
import GlobalTimer from "../../compenents/GlobalTimer/GlobalTimer"; // Import the GlobalTimer component

import SendIcon from "@mui/icons-material/Send";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import Options from "./Options/Options";
import defaultCodes from "./defaultCodes/defaultCodes";
import { SERVER_LINK } from "../../dev-server-link";
import { correctCode } from "./correctCodes/index";
import { useSelector } from "react-redux";

const Question = () => {
  useScrollToTop();

  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(undefined);
  const [question, setQuestion] = useState(undefined);
  const [buggyCode, setBuggyCode] = useState("");

  // not-initialized, submitting, submitted
  const [codeSubmittingState, setcodeSubmittingState] =
    useState("not-initialized");

  const [codeFontSize, setcodeFontSize] = useState(15);
  const [selectedLang, setSelectedLang] = useLocalStorage(
    "selectedlangoj",
    "cpp"
  );
  const [code, setCode] = useState("");
  const [response, setResponse] = useState([]);

  useEffect(() => {
    setLoading(true);
    setError(undefined);
    setQuestion(undefined);
    setBuggyCode("");

    const fetchProblem = async () => {
      try {
        const response = await fetch(
          `${SERVER_LINK}/api/explore/problems/${id}`
        );
        if (!response.ok) {
          throw new Error(`Problem not found with id: ${id}`);
        }

        const data = await response.json();
        setQuestion(data);
        setBuggyCode(data.buggyCode);

        setCode((prev) => (prev === "" ? data.buggyCode || "" : prev));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProblem();
  }, [id]);

  const endRef = useRef(null);

  const submitHandler = async (event) => {
    event.preventDefault();

    if (codeSubmittingState === "submitting") return;

    console.log("submitting code");
    setcodeSubmittingState("submitting");

    try {
      const query = await fetch(`${SERVER_LINK}/api/explore/problems/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          buggyCode,
          quesName: question.name,
          language: "",
        }),
      });
      const queryData = await query.json();
      setResponse(queryData);

      setcodeSubmittingState("submitted");
    } catch (error) {
      setResponse({
        msg: "Error while sending code to the server",
        serverError: JSON.stringify(error),
      });
      setcodeSubmittingState("submitted");
    }
  };

  return (
    <Fragment>
      {/* Add the GlobalTimer component here */}
      <div className="fixed top-[8%] right-4 z-50">
        <GlobalTimer />
      </div>
      
      {loading}
      {!loading && error && (
        <div>
          <div className="errorTemplate">
            <div>
              <span>Msg : </span>Wasn't able to connect to server check if your
              are not offline or server might not be working !
            </div>
            {error && (
              <div>
                <span>Error : </span>
                {JSON.stringify(error)}
              </div>
            )}
          </div>
        </div>
      )}
      {!loading && !error && (
        <div className={classes.contain}>
          <div className={classes.back}>
            <div className={classes.codeSnippet}>
              &#60; go back to questions /&#62;
            </div>
            <ButtonCustom to="/questions" color="yellow">
              <ArrowBackIcon
                style={{
                  marginRight: "0.3em",
                  transform: "translateX(-12px)",
                  fontSize: "1.2em",
                }}
              />
              Back
            </ButtonCustom>
          </div>
          <div className={classes.head}>
            <div style={{ display: "inline-block" }}>
              <div className={classes.heading}>{question.name}</div>
            </div>
          </div>
          <div className={classes.notHead}>
            <div className={classes.body}>
              <div className={classes.desc}>{question.description}</div>
            </div>
            {question.hints.map((hint, index) => (
              <div key={index} className={classes.body}>
                <div className={classes.example} exn={index + 1}>
                  <div>
                    <span>Hint {index + 1}: </span>
                    {hint}
                  </div>
                </div>
              </div>
            ))}
            <div className={classes.editor}>
              <div className={classes.codeSnippet}>
                &#60; write your code here in{" "}
                <span style={{ color: "red", textTransform: "uppercase" }}>
                  {selectedLang}
                </span>{" "}
                /&#62;
              </div>

              <div className={classes.editorText}>
                <CodeEditorv3
                  selectedLang={selectedLang}
                  buggyCode={buggyCode}
                  setBuggyCode={setBuggyCode}
                  language={selectedLang}
                  fontSize={codeFontSize}
                />
              </div>
            </div>
            <div className={classes.submitBtn}>
              <div className={classes.codeSnippet}>
                &#60;&#160;
                {codeSubmittingState === "submitting"
                  ? "wait for response"
                  : codeSubmittingState === "not-initialized"
                  ? "click here to submit"
                  : "wanna submit again"}
                &#160;/&#62;
              </div>
              <ButtonCustom onClick={submitHandler} color="green">
                Submit
                <SendIcon style={{ marginLeft: "0.6em", fontSize: "1.2em" }} />
              </ButtonCustom>
            </div>
            {codeSubmittingState !== "not-initialized" && (
              <div className={classes.body}>
                <div
                  style={{ "--col": response.status === "success" ? 127 : 0 }}
                  className={classes.response}
                >
                  {response.msg && (
                    <div className={classes.resTextHead}>
                      <div className={classes.resHead}>Msg: </div>
                      <div>{response.msg}</div>
                    </div>
                  )}
                  {response.stdout && (
                    <div className={classes.resTextHead}>
                      <div className={classes.resHead}>STDOUT: </div>
                      <div>{response.stdout}</div>
                    </div>
                  )}
                  {response.stderr && (
                    <div className={classes.resTextHead}>
                      <div className={classes.resHead}>STDERR: </div>
                      <div>{response.stderr}</div>
                    </div>
                  )}
                  {response.error && (
                    <div className={classes.resTextHead}>
                      <div className={classes.resHead}>Error: </div>
                      <div>{JSON.stringify(response.error)}</div>
                    </div>
                  )}
                  {response.serverError && (
                    <div className={classes.resTextHead}>
                      <div className={classes.resHead}>ServerError: </div>
                      <div>{response.serverError.toString()}</div>
                    </div>
                  )}
                  {response.status === "pending" && (
                    <div
                      style={{
                        marginTop: "2rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <LoadingSpinner />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          <div aria-hidden ref={endRef}></div>
        </div>
      )}
    </Fragment>
  );
};

const useScrollToTop = (dependencies = []) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
};

export default Question;