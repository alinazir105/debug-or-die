const chai = require("chai");
const expect = chai.expect;

// Simulated functions from the C++ code
function calculateLiftForce(density, velocity, area, liftCoefficient) {
  return 0.5 * density * Math.pow(velocity, 2) * area * liftCoefficient;
}

function calculateWingLoading(weight, wingArea) {
  return weight / wingArea;
}

// Unit tests
describe("Aerodynamics Calculations", () => {
  describe("calculateLiftForce()", () => {
    it("should calculate lift force correctly for given parameters", () => {
      const density = 1.225; // kg/m^3
      const velocity = 250; // m/s
      const area = 50.0; // m^2
      const liftCoefficient = 1.2;

      const result = calculateLiftForce(
        density,
        velocity,
        area,
        liftCoefficient
      );
      expect(result).to.be.closeTo(9187500, 1); // Approximate result
    });

    it("should return 0 if velocity is 0", () => {
      const result = calculateLiftForce(1.225, 0, 50.0, 1.2);
      expect(result).to.equal(0);
    });

    it("should return 0 if lift coefficient is 0", () => {
      const result = calculateLiftForce(1.225, 250, 50.0, 0);
      expect(result).to.equal(0);
    });
  });

  describe("calculateWingLoading()", () => {
    it("should calculate wing loading correctly for given parameters", () => {
      const weight = 8000; // kg
      const wingArea = 50.0; // m^2

      const result = calculateWingLoading(weight, wingArea);
      expect(result).to.equal(160); // kg/m^2
    });

    it("should return Infinity if wing area is 0", () => {
      const result = calculateWingLoading(8000, 0);
      expect(result).to.equal(Infinity);
    });

    it("should return 0 if weight is 0", () => {
      const result = calculateWingLoading(0, 50.0);
      expect(result).to.equal(0);
    });
  });

  describe("Lift-off Check", () => {
    it("should determine lift-off capability based on lift force and weight", () => {
      const density = 1.225;
      const velocity = 250; // m/s
      const area = 50.0;
      const liftCoefficient = 1.2;
      const airplaneWeight = 8000; // kg
      const gravity = 9.8; // m/s^2

      const liftForce = calculateLiftForce(
        density,
        velocity,
        area,
        liftCoefficient
      );
      const canLiftOff = liftForce > airplaneWeight * gravity;

      expect(canLiftOff).to.be.true; // Assuming given values allow lift-off
    });

    it("should not lift off if lift force is insufficient", () => {
      const density = 1.225;
      const velocity = 100; // m/s (lower velocity)
      const area = 50.0;
      const liftCoefficient = 1.2;
      const airplaneWeight = 8000; // kg
      const gravity = 9.8; // m/s^2

      const liftForce = calculateLiftForce(
        density,
        velocity,
        area,
        liftCoefficient
      );
      const canLiftOff = liftForce > airplaneWeight * gravity;

      expect(canLiftOff).to.be.false; // Insufficient lift force
    });
  });
});
