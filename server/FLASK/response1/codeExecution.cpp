#ifndef FEATURE_FLAG_ANALYZER_H
#define FEATURE_FLAG_ANALYZER_H

#include <iostream>
#include <string>
#include <stdexcept>

// Enum representing different environments
enum class Environment { DEVELOPMENT, STAGING, PRODUCTION };

// Class representing a feature flag
class FeatureFlag {
public:
    FeatureFlag(const std::string& name, bool enabled) : name_(name), enabled_(enabled) {}

    // Toggle the feature flag
    void toggle() { enabled_ = !enabled_; }

    // Check if the feature flag is enabled
    bool isEnabled() const { return enabled_; }

    // Get the feature flag's name
    std::string getName() const { return name_; }

private:
    std::string name_;
    bool enabled_;
};

// Class responsible for performing security checks
class SecurityChecker {
public:
    // Validate input (e.g., feature flag name)
    void validateInput(const std::string& input) {
        if (input.empty()) {
            throw std::invalid_argument("Input cannot be empty");
        }
    }

    // Check for unauthorized access
    void checkAccess(const Environment& environment) {
        if (environment != Environment::DEVELOPMENT) {
            throw std::runtime_error("Unauthorized access");
        }
    }
};

// Class that detects and logs errors during the feature flag analysis process
class ErrorDetector {
public:
    // Log an error message
    void logError(const std::string& message) const {
        std::cerr << "Error: " << message << std::endl;
    }
};

// Class providing a debugging tool
class Debugger {
public:
    // Enable or disable debug mode
    void setDebugMode(bool enabled) { debugMode_ = enabled; }

    // Print debug information (e.g., feature flag state)
    void printDebugInfo(const FeatureFlag& featureFlag) const {
        if (debugMode_) {
            std::cout << "Feature Flag: " << featureFlag.getName() << std::endl;
            std::cout << "Enabled: " << (featureFlag.isEnabled() ? "Yes" : "No") << std::endl;
        }
    }

private:
    bool debugMode_ = false;
};

#endif  // FEATURE_FLAG_ANALYZER_H