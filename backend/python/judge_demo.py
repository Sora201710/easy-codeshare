import judge0

result = judge0.run(
    source_code="print(f'hello, {input()}')", stdin="Alice", language=judge0.PYTHON
)
print(result.stdout)
