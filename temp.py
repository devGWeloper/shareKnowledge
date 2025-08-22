import os
import re
import pandas as pd
import sys
from pathlib import Path
from datetime import datetime

# ===================== 사용자 설정 =====================
search_dir = Path("C:/workspace/myproject/src")   # 검색할 프로젝트 경로
keyword = r"[‘']DCOL['’]|\"DCOL\""                # 검색할 키워드 (정규식 가능)
use_regex = True                                  # True: 정규식 검색, False: 일반 문자열 검색
case_sensitive = False                            # 대소문자 구분 여부
whole_word = False                                # 단어 단위 검색 여부
file_extensions = (".java", ".xml", ".properties")# 검색할 확장자
output_file = "search_results.xlsx"               # 결과 저장 파일명
file_encoding = "utf-8"                           # 파일 인코딩 (Eclipse 설정에 맞추세요, ex: "ms949")
# =======================================================

def main():
    # ✅ 프로젝트 경로 체크
    if not search_dir.exists() or not search_dir.is_dir():
        print(f"❌ 에러: 경로 {search_dir} 가 존재하지 않습니다.")
        sys.exit(1)

    results = []

    # ✅ 대소문자 옵션
    flags = 0 if case_sensitive else re.IGNORECASE

    # ✅ 패턴 준비
    if use_regex:
        try:
            pattern = re.compile(keyword, flags)
        except re.error as e:
            print(f"❌ 정규식 에러: {e}")
            sys.exit(1)
    else:
        if whole_word:
            pattern = re.compile(rf"\b{re.escape(keyword)}\b", flags)
        else:
            pattern = re.compile(re.escape(keyword), flags)

    print(f"🔍 검색 시작: {search_dir}")
    print(f"   - 키워드: {keyword}")
    print(f"   - 옵션: regex={use_regex}, case={case_sensitive}, whole_word={whole_word}")

    start_time = datetime.now()
    file_count = 0
    match_count = 0

    # ✅ 파일 탐색
    for root, _, files in os.walk(search_dir):
        for file in files:
            if not file.endswith(file_extensions):
                continue

            file_path = Path(root) / file
            file_count += 1

            try:
                with open(file_path, "r", encoding=file_encoding, errors="ignore") as f:
                    for idx, line in enumerate(f, start=1):
                        matches = pattern.findall(line)
                        for match in matches:
                            results.append([
                                str(file_path),   # 전체 파일 경로
                                file,             # 클래스 파일 이름
                                idx,              # 라인 번호
                                line.strip()      # 매칭된 내용
                            ])
                            match_count += 1
            except Exception as e:
                print(f"⚠️ 파일 무시됨: {file_path} ({e})")
                continue

    # ✅ 결과 저장
    if results:
        df = pd.DataFrame(results, columns=["File", "Class", "Line", "Content"])
        df.to_excel(output_file, index=False)
        elapsed = (datetime.now() - start_time).total_seconds()
        print(f"\n✅ 검색 완료: {match_count}건 발견 / {file_count}개 파일 검사")
        print(f"📂 결과 저장: {output_file}")
        print(f"⏱ 실행 시간: {elapsed:.2f}초")
    else:
        print(f"\n⚠️ 검색 결과 없음 (파일 {file_count}개 검사함)")

if __name__ == "__main__":
    main()