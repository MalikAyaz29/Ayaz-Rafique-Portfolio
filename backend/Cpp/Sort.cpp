#include <iostream>
#include <vector>
#include <sstream>
#include <cstdlib>

using namespace std;

int main(int argc, char* argv[]) {

    if (argc < 2) {
        cout << "Invalid input";
        return 0;
    }

    vector<int> arr;
    string input = argv[1];
    string temp;

    stringstream ss(input);
    while (getline(ss, temp, ',')) {
        arr.push_back(atoi(temp.c_str()));
    }

    // Bubble Sort
    for (int i = 0; i < arr.size() - 1; i++) {
        for (int j = 0; j < arr.size() - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int t = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = t;
            }
        }
    }

    // Output (NO EXTRA TEXT — Node friendly)
    for (int i = 0; i < arr.size(); i++) {
        cout << arr[i];
        if (i != arr.size() - 1)
            cout << ",";
    }

    return 0;
}

