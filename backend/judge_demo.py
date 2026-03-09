import judge0
from dotenv import load_dotenv
import os

load_dotenv();


source_code = """
#include <stdio.h>

int main() {
    printf("hello, world in  c\\n");
    return 0;
}
"""

result = judge0.run(source_code=source_code, language=judge0.C)

print(result.stdout)
