#include <iostream>
#include <cmath>

using namespace std;

// Function to calculate lift force
// L = 0.5 * rho * v^2 * A * Cl
double calculateLiftForce(double density, double velocity, double area, double liftCoefficient)
{
    return 0.5 * density * pow(velocity, 2) * area * liftCoefficient;
}

// Function to calculate wing loading
// Wing Loading = Weight / Wing Area
double calculateWingLoading(double weight, double wingArea)
{
    return weight / wingArea;
}

int main()
{
    // Airplane wing parameters
    double airDensity = 1.225;    // kg/m^3 at sea level
    double velocity = 250;        // Intentional bug: should be in m/s, but assumed to be km/h
    double wingArea = 50.0;       // in square meters
    double liftCoeff = 1.2;       // Correct spelling should be liftCoefficient
    double airplaneWeight = 8000; // in kilograms

    // Calculate lift force
    double liftForce = calculateLiftForce(airDensity, velocity, wingArea, liftCoeff); // Using incorrect variable 'liftCoeff'

    // Calculate wing loading
    double wingLoading = calculateWingLoading(airplaneWeight, wingArea);

    // Output results
    cout << "Lift Force: " << liftForce << " N" << endl;         // Bug: lift force will be incorrect due to velocity unit
    cout << "Wing Loading: " << wingLoading << " N/m^2" << endl; // Unit should be kg/m^2 for weight/area

    // Intentional bug: incorrect interpretation of results
    if (liftForce > airplaneWeight * 9.8)
    {
        cout << "The airplane can lift off safely." << endl;
    }
    else
    {
        cout << "The airplane cannot lift off safely." << endl; // Incorrect check, liftForce should be compared with weight*gravity
    }

    return 0;
}
