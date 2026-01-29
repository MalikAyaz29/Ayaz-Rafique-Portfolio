#include <iostream>
#include <string>
#include <cstdlib>   // for atof

using namespace std;

int main(int argc, char* argv[]) {

    if (argc < 4) {
        cout << "Invalid input";
        return 0;
    }

    double a = atof(argv[1]);
    double b = atof(argv[2]);
    string op = argv[3];

    if (op == "+") cout << a + b;
    else if (op == "-") cout << a - b;
    else if (op == "*") cout << a * b;
    else if (op == "/") {
        if (b == 0) cout << "Divide by zero";
        else cout << a / b;
    }
    else {
        cout << "Invalid operator";
    }

    return 0;
}

