#include <iostream>
#include <vector>
#include <sstream>
#include <algorithm>
#include <cstdlib>

using namespace std;

int linearSearch(const vector<int>& arr, int target) {
    for (int i = 0; i < arr.size(); i++) {
        if (arr[i] == target)
            return i;
    }
    return -1;
}

int binarySearch(const vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    while (left <= right) {
        int mid = (left + right) / 2;
        if (arr[mid] == target)
            return mid;
        else if (arr[mid] < target)
            left = mid + 1;
        else
            right = mid - 1;
    }
    return -1;
}

int main(int argc, char* argv[]) {

    if (argc < 3) {
        cout << "Invalid input";
        return 0;
    }

    vector<int> arr;
    string input = argv[1];
    int target = atoi(argv[2]);

    string temp;
    stringstream ss(input);

    while (getline(ss, temp, ',')) {
        arr.push_back(atoi(temp.c_str()));
    }

    int linRes = linearSearch(arr, target);

    sort(arr.begin(), arr.end());
    int binRes = binarySearch(arr, target);

    cout << "Linear:";
    if (linRes != -1) cout << linRes;
    else cout << -1;

    cout << " Binary:";
    if (binRes != -1) cout << binRes;
    else cout << -1;

    return 0;
}

