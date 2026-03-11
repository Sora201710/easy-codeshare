import judge0
import requests
from dotenv import load_dotenv
import os

load_dotenv()

source_code = """
#include <stdio.h>

int main() {
    printf("hello, world in  c\n");
    return 0;
}
"""
result = requests.post(
    "http://localhost:2358/submissions",
    data={"source_code": source_code, "language_id": judge0.PYTHON},
)

print(result.json())
