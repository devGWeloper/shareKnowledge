import os
import re
import pandas as pd

# ===================== 사용자 설정 =====================
search_dir = "C:/workspace/myproject/src"   # 검색할 프로젝트 경로
keyword = r"public\s+class"                 # 검색할 키워드 (정규식 가능)
use_regex = True                            # True: 정규식 검색, False: 일반 문자열 검색
case_sensitive = False                      # 대소문자 구분 여부
whole_word = False                          # 단어 단위 검색 여부
file_extensions = (".java", ".xml", ".properties")  # 검색할 확장자
# =======================================================

results = []

# 대소문자 옵션
flags = 0 if case_sensitive else re.IGNORECASE

# 정규식 준비
if use_regex:
    pattern = re.compile(keyword, flags)
else:
    # whole_word 옵션 적용
    if whole_word:
        pattern = re.compile(rf"\b{re.escape(keyword)}\b", flags)
    else:
        pattern = re.compile(re.escape(keyword), flags)

# 파일 탐색
for root, _, files in os.walk(search_dir):
    for file in files:
        if file.endswith(file_extensions):
            file_path = os.path.join(root, file)
            try:
                with open(file_path, "r", encoding="utf-8") as f:
                    for idx, line in enumerate(f, start=1):
                        if pattern.search(line):
                            results.append([file_path, idx, line.strip()])
            except UnicodeDecodeError:
                continue

# 결과 저장
df = pd.DataFrame(results, columns=["File", "Line", "Content"])
df.to_excel("search_results.xlsx", index=False)

print(f"검색 완료 ✅ {len(results)}건 발견 → search_results.xlsx 저장됨")