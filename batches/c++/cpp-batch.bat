g++ cpp-code.cpp -o cpp.exe
if ERRORLEVEL 1 exit /b 1
cpp.exe < input.txt > output.txt