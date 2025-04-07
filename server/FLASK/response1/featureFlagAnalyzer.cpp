#include "feature_flag_analyzer.h"

int main() {
    // Create a feature flag
    FeatureFlag featureFlag("Example Flag", false);

    // Create a security checker
    SecurityChecker securityChecker;

    // Create an error detector
    ErrorDetector errorDetector;

    // Create a debugger
    Debugger debugger;

    // Enable debug mode
    debugger.setDebugMode(true);

    try {
        // Validate input (feature flag name)
        securityChecker.validateInput(featureFlag.getName());

        // Check for unauthorized access
        securityChecker.checkAccess(Environment::DEVELOPMENT);

        // Toggle the feature flag
        featureFlag.toggle();

        // Print debug information
        debugger.printDebugInfo(featureFlag);

    } catch (const std::exception& e) {
        // Log an error message
        errorDetector.logError(e.what());
    }

    return 0;