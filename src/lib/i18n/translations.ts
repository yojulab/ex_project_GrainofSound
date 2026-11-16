export type Language = "ko" | "fr";

export interface ProgramItemTranslation {
  key: "welfare" | "festival" | "workshop";
  tabNum: string;
  tabEn: string;
  tabKo: string;
  badge: string;
  title: string;
  target: string;
  summary: string;
  highlights: string[];
}

export interface StatItemTranslation {
  num: string;
  unit: string;
  label: string;
  description: string;
}

export interface ValueItemTranslation {
  num: string;
  subtitle: string;
  title: string;
  description: string;
}

export const translations = {
  ko: {
    common: {
      siteTitle: "연희단 결",
      siteEn: "GYEOL",
      siteFullTitle: "연희단 결 (GYEOL : The Grain of Sound)",
      slogan: "나무와 가죽, 사람의 숨결이 빚어내는 우리 소리의 결",
      subTagline: "전통예술 보급 및 문화 취약계층 나눔을 실천하는 비영리 예술 공동체",
      close: "닫기",
      confirm: "확인",
      submitPending: "접수 중...",
    },
    header: {
      navAbout: "소개",
      navRepertoire: "프로그램",
      navJoin: "함께하기",
      navAction: "문의·신청",
      digitalCard: "디지털 명함",
      ariaNav: "섹션 바로가기",
    },
    hero: {
      metaLine: "BUCHEON · NON-PROFIT TRADITIONAL ARTS",
      metaName: "연희단 결",
      badge: "GYEOL : THE GRAIN OF SOUND",
      titleMain: "The Grain of Sound,",
      titleSub: "GYEOL",
      slogan: "나무와 가죽, 사람의 숨결이 빚어내는 우리 소리의 결",
      description:
        "부천을 거점으로 전통연희의 울림을 이웃과 세계에 나누는 비영리 예술 공동체 연희단 결입니다.",
      scrollIndicator: "Scroll to Explore",
    },
    about: {
      sectionNum: "02 · About GYEOL",
      titleLine1: "부천에서 울려 퍼지는",
      titleLine2: "우리 소리의 공동체",
      description:
        "연희단 결(GYEOL)은 나무의 나이테처럼 시간이 쌓아 올린 전통 장단과 사람의 온기를 담아내는 고유번호증 등록 비영리임의단체입니다.",
      stats: [
        {
          num: "48",
          unit: "회+",
          label: "누적 나눔공연",
          description: "수도권 요양원·복지관 찾아가는 나눔 무대",
        },
        {
          num: "2,400",
          unit: "명+",
          label: "함께 나눈 온기",
          description: "공연을 함께 즐겨주신 어르신 및 지역 이웃",
        },
        {
          num: "16",
          unit: "명",
          label: "소리의 결을 잇는 단원",
          description: "장구·소고·민요 연주자 및 나눔 서포터즈",
        },
      ] as StatItemTranslation[],
      values: [
        {
          num: "01",
          subtitle: "Compassion & Healing",
          title: "나눔의 결",
          description:
            "요양원과 복지시설 등 문화의 손길이 닿기 어려운 이웃을 직접 찾아가 따뜻한 치유와 신명의 무대를 전합니다.",
        },
        {
          num: "02",
          subtitle: "Cultural Exchange",
          title: "교류의 결",
          description:
            "지자체 공식 축제, 주한 대사관 문화교류 행사 등 한국 전통연희의 단아하고 역동적인 미를 알리는 초청 무대를 빚습니다.",
        },
        {
          num: "03",
          subtitle: "Open Community",
          title: "이음의 결",
          description:
            "전통문화의 맥을 잇고 청소년 예술 활동과 지역 연주자들의 숨결이 어우러지는 열린 비영리 예술 공동체를 지향합니다.",
        },
      ] as ValueItemTranslation[],
    },
    repertoire: {
      sectionNum: "03 · Repertoire & Catalog",
      title: "전시 도록 & 대표 레퍼토리",
      description:
        "어르신들을 위한 온화한 치유 나눔부터 축제 길놀이, 청소년 참여형 워크숍까지 정성을 다해 기획된 3대 공식 프로그램을 도록 형태로 선보입니다.",
      targetLabel: "추천 대상: ",
      programs: {
        welfare: {
          key: "welfare",
          tabNum: "01",
          tabEn: "WELFARE",
          tabKo: "요양원 힐링 연희",
          badge: "WELFARE & HEALING",
          title: "요양원 힐링 연희",
          target: "요양원 · 주간보호센터 · 노인복지관 · 지역 돌봄 소외 이웃 최적화",
          summary:
            "어르신들의 정서와 호흡에 맞춘 친숙한 민요 가락과 장구·소고 신명 한마당으로, 실내 강당이나 소규모 병동 공간에서도 안전하고 따뜻하게 즐길 수 있는 맞춤형 치유 나눔 공연입니다.",
          highlights: [
            "어르신 함께 부르는 경기·남도 민요 및 아리랑 메들리",
            "장구·소고 합주와 흥겨운 어깨춤·박수 레크리에이션",
            "소요 시간 30~50분 (기관 일정 및 어르신 컨디션에 맞춘 유연한 구성)",
            "이동이 불편하신 어르신들을 위한 좌석 맞춤형 동선 조율",
          ],
        },
        festival: {
          key: "festival",
          tabNum: "02",
          tabEn: "FESTIVAL",
          tabKo: "길놀이·판굿",
          badge: "FESTIVAL & PROTOCOL",
          title: "길놀이·판굿",
          target: "지자체 문화축제 · 구청·시청 공식 행사 · 주한 대사관 문화교류",
          summary:
            "행사장의 품격을 높이는 힘찬 길놀이부터 사물판굿, 한국 전통연희 갈라 프로그램까지, 관객과 함께 호흡하며 한국 소리의 웅장한 결을 선보이는 공식 초청 무대입니다.",
          highlights: [
            "개막을 알리는 야외/실내 길놀이 및 비나리 축원",
            "풍물 사물판굿, 설장구 독주 및 모둠북·소고 역동적 앙상블",
            "국제 교류 및 외교 행사 맞춤형 영문·국문 레퍼토리 해설 지원",
            "관객이 참여하는 대동놀이 및 피날레 어울림",
          ],
        },
        workshop: {
          key: "workshop",
          tabNum: "03",
          tabEn: "WORKSHOP",
          tabKo: "글로벌 청소년 워크숍",
          badge: "WORKSHOP & EXCHANGE",
          title: "글로벌 청소년 워크숍",
          target: "초·중·고교 예술 교육 · 다문화 가정 및 주한 외국인 체험 · 재외동포 청소년",
          summary:
            "눈으로 보는 공연을 넘어 직접 장구와 버나를 돌리고 추임새를 배우는 참여형 워크숍입니다. 언어의 장벽을 넘어 우리 장단의 신명과 공동체 호흡을 온몸으로 체득할 수 있습니다.",
          highlights: [
            "기초 자진모리·휘모리 장단 타구 및 버나 돌리기 체험",
            "우리 가락의 호흡과 원리를 쉽게 풀어내는 해설형 예술 강습",
            "영어·한국어 이중 해설 및 단체 수료증/기념 굿즈 제공 가능",
            "학교 및 청소년 기관 일정에 맞춘 40~90분 맞춤형 모듈",
          ],
        },
      } as Record<"welfare" | "festival" | "workshop", ProgramItemTranslation>,
      applyButton: "이 프로그램으로 공연 신청하기",
      galleryTitle: "전시 도록 아카이브 갤러리",
      galleryHint: "사진을 누르면 상세 도록 캡션을 보실 수 있습니다",
      categories: {
        welfare: "01 · WELFARE 나눔·복지 공연",
        festival: "02 · FESTIVAL 축제·의전 공연",
      },
    },
    joinUs: {
      sectionNum: "04 · Join Us",
      title: "소리의 결을 함께 빚어가는 길",
      description:
        "무대 위에서 함께 장단을 맞추는 연주 단원부터, 전통문화 나눔의 뜻에 마음을 보태주시는 후원회원(서포터즈)까지 모두 연희단 결의 소중한 구성원입니다.",
      memberCard: {
        subtitle: "PERFORMING MEMBER",
        title: "일반단원 모집 안내",
        description:
          "경기도 부천시 및 인근 지역(인천·서울 서부 등) 거주자 중 장구 · 소고 · 민요 등 전통연희 유경험자 분들을 환영합니다.",
        points: [
          "활동 거점: 경기도 부천시 연습실 (정기 합주 및 참관 가능)",
          "연습 분위기: 서로의 호흡을 존중하며 즐겁게 기량을 나누는 공동체",
          "주요 활동: 부천 관내 복지기관 나눔 공연 및 지역 축제 무대 참여",
        ],
        button: "일반회원(단원) 지원하기",
      },
      supporterCard: {
        subtitle: "SUPPORTERS",
        title: "후원회원(서포터즈) 안내",
        description:
          "연희단 결의 요양원·복지관 찾아가는 나눔 공연과 청소년 전통예술 활동은 서포터즈 분들의 소중한 회비로 이어집니다.",
        points: [
          "회비 사용처: 취약계층 무료 나눔 공연 제작 및 악기·의상 유지",
          "청소년 예술 지원: 지역 청소년 전통연희 체험 및 무대 기회 제공",
          "가입 절차: 문의 접수 후 담당자가 1:1로 연락드려 상세히 안내",
        ],
        button: "후원회원 가입 문의하기",
      },
    },
    actionCenter: {
      sectionNum: "05 · Action Center",
      title: "연희단 결과 마음을 잇는 첫걸음",
      description:
        "공연 섭외, 연주 단원 지원, 후원회원 가입 문의를 간편한 양식으로 남겨주시거나 카카오톡 1:1 오픈채팅으로 바로 말씀 나눠 보세요.",
      cards: {
        performance: {
          step: "01 · Performance Booking",
          title: "공연 신청하기",
          desc: "요양원·복지관·지자체·대사관 섭외 문의 →",
        },
        member: {
          step: "02 · Join as Performer",
          title: "일반회원(단원) 지원",
          desc: "장구·소고·민요 유경험자 참관 및 입단 문의 →",
        },
        supporter: {
          step: "03 · Supporter Inquiry",
          title: "후원회원 가입 문의",
          desc: "1:1 개별 안내를 통한 서포터즈 참여 문의 →",
        },
      },
      kakao: {
        title: "메신저로 바로 상담하고 싶으신가요?",
        desc: "별도 절차 없이 카카오톡 오픈채팅으로 담당자와 1:1 대화가 가능합니다.",
        button: "카카오톡 1:1 오픈채팅 연결",
      },
    },
    stickyBottom: {
      performance: "공연 신청하기",
      member: "단원 지원",
      supporter: "후원 문의",
    },
    footer: {
      locationLabel: "소재지: ",
      representativeLabel: "대표자: ",
      registrationNumberLabel: "고유번호: ",
      phoneLabel: "공식 연락처: ",
      emailLabel: "이메일: ",
      legalNoticeTitle: "※ 비영리임의단체 법적 지위 및 기부금 영수증 미발행 안내",
      legalNoticeDesc:
        "연희단 결은 부천세무서 고유번호증(123-82-45678)을 교부받은 비영리임의단체입니다. 법인세법 및 소득세법상 지정기부금단체가 아니므로, 납부하신 회비·후원금에 대해 세액공제용 기부금 영수증은 발행되지 않습니다. 후원회원 가입 및 회비 안내는 1:1 개별 문의를 통해서만 진행되며, 본 웹사이트에는 계좌번호를 일체 공개하지 않습니다.",
      rights: "All rights reserved.",
      subTagline:
        "전통예술 보급 및 문화 취약계층 나눔을 실천하는 비영리 예술 공동체",
    },
    modals: {
      performance: {
        title: "공연 신청하기",
        subtitle: "M01 · Performance Booking",
        orgLabel: "기관/단체명",
        orgPlaceholder: "예: 부천시 OO요양원, 종로구청, 주한 OO대사관",
        contactNameLabel: "담당자 성함",
        contactNamePlaceholder: "예: 홍길동 팀장",
        contactPhoneLabel: "연락처 (휴대전화)",
        contactPhonePlaceholder: "010-0000-0000",
        preferredDatePlaceLabel: "희망 일시 및 장소",
        preferredDatePlacePlaceholder:
          "예: 2026년 10월 중순 평일 오후, 부천시 원미구 강당",
        eventTypeLabel: "행사 성격",
        eventTypes: {
          welfare: "복지·나눔 공연",
          festival: "지역 축제·문화행사",
          diplomatic: "외교·기관 초청",
          other: "기타",
        },
        notesLabel: "상세 문의 내용 (선택)",
        notesPlaceholder:
          "관람 예상 인원, 공간 특성 등을 적어주시면 맞춤 조율이 가능합니다.",
        privacyAgreedTitle: "[필수] 개인정보 수집 및 이용 동의:",
        privacyAgreedText:
          "공연 섭외 및 상담을 위해 단체명, 담당자명, 연락처, 일정 정보를 수집하며, 상담 완료 후 1년간 안전하게 보관됩니다.",
        privacyError: "개인정보 수집 및 이용에 동의해 주세요.",
        submitButton: "공연 섭외 신청서 제출하기",
        kakaoButton: "카카오톡 오픈채팅으로 바로 문의하기",
        successMessage:
          "공연 신청이 정상적으로 접수되었습니다. 담당자가 확인 후 빠르게 연락드리겠습니다.",
        errorMessage:
          "접수 중 오류가 발생했습니다. 아래 카카오톡 오픈채팅으로 문의해 주세요.",
      },
      member: {
        title: "일반회원(단원) 지원하기",
        subtitle: "M02 · Join as Performer",
        applicantNameLabel: "지원자 성명",
        applicantNamePlaceholder: "예: 김연희",
        applicantPhoneLabel: "연락처 (휴대전화)",
        applicantPhonePlaceholder: "010-0000-0000",
        residentialAreaLabel: "거주 지역",
        residentialAreaPlaceholder: "예: 경기도 부천시 원미동, 인천 부평구 등",
        specialtiesLabel: "주요 분야 (복수 선택 가능)",
        specialtyOptions: {
          janggu: "장구 (풍물/설장구)",
          sogo: "소고 (소고춤/채상)",
          minyo: "민요 (경기/남도)",
          other: "기타 (북/꽹과리/태평소 등)",
        },
        experienceLabel: "연주 경력 및 간단한 소개",
        experiencePlaceholder:
          "동호회 활동, 강습 이력, 함께하고 싶은 마음 등을 자유롭게 적어주세요.",
        privacyAgreedTitle: "[필수] 개인정보 수집 및 이용 동의:",
        privacyAgreedText:
          "단원 지원 접수 및 오디션/참관 안내를 위해 성함, 연락처, 거주지, 경력 사항을 수집하며, 선발 전형 완료 시까지 안전하게 보관됩니다.",
        privacyError: "개인정보 수집 및 이용에 동의해 주세요.",
        specialtyError: "하나 이상의 주요 분야를 선택해 주세요.",
        submitButton: "단원 지원서 제출하기",
        kakaoButton: "카카오톡 오픈채팅으로 문의하기",
        successMessage:
          "단원 지원서가 정상적으로 접수되었습니다. 담당자가 확인 후 연락을 드리겠습니다.",
        errorMessage:
          "지원서 접수 중 오류가 발생했습니다. 카카오톡 오픈채팅으로 문의해 주세요.",
      },
      supporter: {
        title: "후원회원 가입 문의",
        subtitle: "M03 · Supporter Inquiry",
        legalNoticeBadge: "법적 고지 사항 (비영리임의단체)",
        legalNoticeDesc:
          "연희단 결은 부천세무서 고유번호증을 교부받은 비영리임의단체입니다. 세액공제용 기부금 영수증은 발행되지 않으며, 납부하시는 회비는 단체 정관에 규정된 비영리 고유목적사업(소외계층 나눔 공연 및 청소년 예술 지원)에 투명하게 사용됩니다. 회비 납부 계좌는 1:1 개별 상담 시에만 직접 안내해 드립니다.",
        supporterNameLabel: "성함 또는 단체명",
        supporterNamePlaceholder: "예: 홍길동 또는 (주)한국문화",
        phoneLabel: "연락처 (휴대전화)",
        phonePlaceholder: "010-0000-0000",
        preferredMethodLabel: "희망 안내 방식",
        methods: {
          kakao: "카카오톡 / 문자 메시지 안내",
          phone: "유선 전화 상담",
        },
        supportTypeLabel: "후원 희망 형태",
        types: {
          regular: "정기 후원회원 가입 문의",
          onetime: "일시 회비 납부 문의",
        },
        cheeringLabel: "연희단 결에 전하는 응원 한마디 (선택)",
        cheeringPlaceholder: "따뜻한 응원의 말씀을 남겨주세요.",
        disclaimerCheckTitle: "[필수] 기부금 영수증 미발행 고지 확인:",
        disclaimerCheckText:
          "연희단 결은 비영리임의단체로 세액공제용 기부금 영수증이 발행되지 않으며, 회비는 고유목적사업에 사용됨을 확인하였습니다.",
        privacyCheckTitle: "[필수] 개인정보 수집 및 이용 동의:",
        privacyCheckText:
          "1:1 후원회원 안내 및 연락을 위해 성함, 연락처를 수집하며 문의 처리 후 1년간 보관됩니다.",
        disclaimerError:
          "기부금 영수증 미발행 고지 사항을 확인하고 동의해 주세요.",
        privacyError: "개인정보 수집 및 이용에 동의해 주세요.",
        submitButton: "1:1 후원회원 안내 요청하기",
        kakaoButton: "카카오톡으로 1:1 후원 문의하기",
        successMessage:
          "후원회원 가입 문의가 접수되었습니다. 담당자가 확인 후 선택하신 방식으로 1:1 개별 연락을 드리겠습니다.",
        errorMessage:
          "문의 접수 중 오류가 발생했습니다. 카카오톡 오픈채팅으로 문의해 주세요.",
      },
      digitalCard: {
        modalLabel: "연희단 결 모바일 디지털 명함",
        badge: "Official Digital Card",
        closeLabel: "디지털 명함 닫기",
        repTitle: "대표",
        regLabel: "고유번호",
        locLabel: "소재지",
        phoneLabel: "공식연락처",
        emailLabel: "이메일",
        footerTag: "부천 거점 비영리 예술 공동체",
        downloadVcard: "vCard 연락처 저장 (.vcf)",
        copyLink: "페이지 링크 복사 (토스트 알림)",
        copiedLink: "링크가 복사되었습니다!",
        copiedToast:
          "클립보드에 웹페이지 링크가 복사되었습니다. 카카오톡이나 메시지로 공유하세요.",
      },
      archiveLightbox: {
        closeLabel: "확대 보기 닫기",
        archiveNo: "GYEOL Archive No.",
      },
    },
  },
  fr: {
    common: {
      siteTitle: "Troupe Yeonhui GYEOL",
      siteEn: "GYEOL",
      siteFullTitle: "Troupe Yeonhui GYEOL (The Grain of Sound)",
      slogan:
        "Le souffle du bois, du cuir et de l'humain créant le grain du son coréen",
      subTagline:
        "Communauté artistique à but non lucratif œuvrant pour le partage des arts traditionnels et la solidarité",
      close: "Fermer",
      confirm: "Confirmer",
      submitPending: "Envoi en cours...",
    },
    header: {
      navAbout: "Présentation",
      navRepertoire: "Répertoire",
      navJoin: "Nous rejoindre",
      navAction: "Contact & Réservation",
      digitalCard: "Carte de visite",
      ariaNav: "Navigation des sections",
    },
    hero: {
      metaLine: "BUCHEON · ARTS TRADITIONNELS À BUT NON LUCRATIF",
      metaName: "Troupe Yeonhui GYEOL",
      badge: "GYEOL : THE GRAIN OF SOUND",
      titleMain: "The Grain of Sound,",
      titleSub: "GYEOL",
      slogan:
        "Le souffle du bois, du cuir et de l'humain créant le grain du son coréen",
      description:
        "Basée à Bucheon, la Troupe Yeonhui GYEOL est une communauté artistique à but non lucratif qui partage la résonance du Yeonhui avec la société et le monde.",
      scrollIndicator: "Défiler pour découvrir",
    },
    about: {
      sectionNum: "02 · About GYEOL",
      titleLine1: "Une communauté du son coréen",
      titleLine2: "résonnant depuis Bucheon",
      description:
        "La Troupe GYEOL est une association enregistrée à but non lucratif qui insuffle la chaleur humaine dans les rythmes ancestraux gravés par le temps, tels les anneaux d'un arbre.",
      stats: [
        {
          num: "48",
          unit: "+",
          label: "Spectacles solidaires",
          description:
            "Visites bienveillantes en maisons de retraite et centres sociaux",
        },
        {
          num: "2 400",
          unit: "+",
          label: "Vies et cœurs partagés",
          description: "Aînés et spectateurs ayant partagé la chaleur du son",
        },
        {
          num: "16",
          unit: "membres",
          label: "Artistes et membres",
          description:
            "Musiciens de Janggu, Sogo, Minyo et bénévoles dévoués",
        },
      ] as StatItemTranslation[],
      values: [
        {
          num: "01",
          subtitle: "Compassion & Healing",
          title: "Le Grain du Partage",
          description:
            "Nous allons à la rencontre des personnes vulnérables dans les maisons de retraite et centres sociaux pour offrir réconfort et allégresse par la musique traditionnelle.",
        },
        {
          num: "02",
          subtitle: "Cultural Exchange",
          title: "Le Grain d'Échange",
          description:
            "Nous créons des scènes d'exception pour les festivals officiels et les échanges diplomatiques, révélant la grâce et le dynamisme du Yeonhui coréen.",
        },
        {
          num: "03",
          subtitle: "Open Community",
          title: "Le Grain de Transmission",
          description:
            "Nous bâtissons une communauté artistique ouverte pour perpétuer le patrimoine, réunissant jeunes et musiciens locaux dans un même élan.",
        },
      ] as ValueItemTranslation[],
    },
    repertoire: {
      sectionNum: "03 · Repertoire & Catalog",
      title: "Catalogue d'Exposition & Répertoire",
      description:
        "Des représentations intimistes et thérapeutiques pour les aînés aux parades rituelles et ateliers internationaux pour la jeunesse, découvrez nos trois programmes d'excellence.",
      targetLabel: "Public cible : ",
      programs: {
        welfare: {
          key: "welfare",
          tabNum: "01",
          tabEn: "WELFARE",
          tabKo: "Yeonhui Thérapeutique",
          badge: "WELFARE & HEALING",
          title: "Yeonhui Thérapeutique pour Aînés",
          target:
            "Maisons de retraite · Centres d'accueil de jour · Établissements pour aînés",
          summary:
            "Un spectacle sur mesure adapté au rythme des aînés, mêlant chants folkloriques familiers (Minyo) et percussions douces (Janggu, Sogo), apportant chaleur et apaisement au sein même des établissements.",
          highlights: [
            "Chants folkloriques Minyo et Arirang partagés avec les résidents",
            "Ensemble de Janggu et Sogo, danses douces et récréation rythmée",
            "Durée de 30 à 50 minutes (programme flexible selon les aînés)",
            "Disposition scénique adaptée aux personnes à mobilité réduite",
          ],
        },
        festival: {
          key: "festival",
          tabNum: "02",
          tabEn: "FESTIVAL",
          tabKo: "Gilnori & Pangut",
          badge: "FESTIVAL & PROTOCOL",
          title: "Gilnori & Pangut (Parade & Fête rituelle)",
          target:
            "Festivals culturels · Cérémonies municipales · Événements diplomatiques",
          summary:
            "De la parade d'ouverture dynamique (Gilnori) aux percussions rituelles (Samul Pangut), une prestation scénique prestigieuse qui dévoile la majesté et la ferveur des arts traditionnels coréens.",
          highlights: [
            "Parade inaugurale (Gilnori) et prière de bénédiction rituelle (Binari)",
            "Pangut dynamique, solo de Seoljanggu et ensemble de percussions Sogo/Buk",
            "Présentation bilingue (français/anglais/coréen) pour réceptions internationales",
            "Final festif et participatif avec le public (Daedong-nori)",
          ],
        },
        workshop: {
          key: "workshop",
          tabNum: "03",
          tabEn: "WORKSHOP",
          tabKo: "Atelier Jeunesse",
          badge: "WORKSHOP & EXCHANGE",
          title: "Atelier International pour la Jeunesse",
          target:
            "Écoles primaires et secondaires · Familles multiculturelles · Jeunesse internationale",
          summary:
            "Au-delà de l'observation, un atelier immersif invitant à frapper le Janggu, faire tourner le Beona et pratiquer les acclamations (Chuimsae). Une expérience transcendant les barrières linguistiques.",
          highlights: [
            "Initiation aux rythmes de base (Jajinmori, Hwimori) et à l'art du Beona",
            "Pédagogie accessible expliquant la respiration et l'esprit des rythmes",
            "Animation multilingue avec attestation de participation disponible",
            "Modules adaptables de 40 à 90 minutes pour les groupes scolaires",
          ],
        },
      } as Record<"welfare" | "festival" | "workshop", ProgramItemTranslation>,
      applyButton: "Demander un spectacle avec ce programme",
      galleryTitle: "Galerie d'Archives du Catalogue",
      galleryHint: "Cliquez sur une photo pour afficher la notice détaillée",
      categories: {
        welfare: "01 · WELFARE Spectacle Solidaire & Thérapeutique",
        festival: "02 · FESTIVAL Spectacle Officiel & Fête",
      },
    },
    joinUs: {
      sectionNum: "04 · Join Us",
      title: "Façonner ensemble le grain du son",
      description:
        "Des artistes partageant le rythme sur scène aux membres bienfaiteurs soutenant la diffusion solidaire, chacun constitue un maillon précieux de la Troupe GYEOL.",
      memberCard: {
        subtitle: "PERFORMING MEMBER",
        title: "Recrutement des Artistes",
        description:
          "Nous accueillons chaleureusement les pratiquants de Janggu, Sogo et Minyo résidant à Bucheon ou dans ses environs (Incheon, ouest de Séoul).",
        points: [
          "Lieu de pratique : Studio de répétition à Bucheon (répétitions régulières et visites)",
          "Atmosphère : Une communauté bienveillante favorisant l'écoute et l'échange mutuel",
          "Missions : Participation aux spectacles solidaires locaux et aux festivals régionaux",
        ],
        button: "Rejoindre la troupe (Candidature)",
      },
      supporterCard: {
        subtitle: "SUPPORTERS",
        title: "Adhésion Mécènes & Bénévoles",
        description:
          "Nos représentations gratuites en maisons de retraite et nos activités pour les jeunes sont rendues possibles par les cotisations de nos bienfaiteurs.",
        points: [
          "Affectation des fonds : Création de spectacles solidaires et entretien des instruments",
          "Soutien aux jeunes : Découverte des arts traditionnels et bourses d'ateliers",
          "Processus : Après votre message, un responsable vous guide par contact personnalisé",
        ],
        button: "Devenir mécène / Soutien",
      },
    },
    actionCenter: {
      sectionNum: "05 · Action Center",
      title: "Premier pas pour vous lier à GYEOL",
      description:
        "Que ce soit pour programmer un spectacle, auditionner en tant qu'artiste ou devenir membre bienfaiteur, écrivez-nous ou discutez via messagerie directe.",
      cards: {
        performance: {
          step: "01 · Performance Booking",
          title: "Demander un spectacle",
          desc: "Maisons de retraite, centres, mairies, ambassades →",
        },
        member: {
          step: "02 · Join as Performer",
          title: "Rejoindre la troupe",
          desc: "Pratique de Janggu, Sogo, Minyo & audition →",
        },
        supporter: {
          step: "03 · Supporter Inquiry",
          title: "Devenir mécène / Soutien",
          desc: "Contact personnalisé pour adhésion et soutien →",
        },
      },
      kakao: {
        title: "Souhaitez-vous un échange direct ?",
        desc: "Discutez en direct 1:1 avec notre équipe via KakaoTalk Open Chat sans formalité.",
        button: "Ouvrir le chat 1:1 KakaoTalk",
      },
    },
    stickyBottom: {
      performance: "Demander un spectacle",
      member: "Rejoindre",
      supporter: "Mécénat",
    },
    footer: {
      locationLabel: "Siège : ",
      representativeLabel: "Présidente : ",
      registrationNumberLabel: "N° d'immatriculation : ",
      phoneLabel: "Tél. officiel : ",
      emailLabel: "E-mail : ",
      legalNoticeTitle:
        "※ Statut légal d'association et mention sur les reçus fiscaux",
      legalNoticeDesc:
        "La troupe Yeonhui GYEOL est une association à but non lucratif enregistrée sous numéro unique (Bucheon, 123-82-45678). Les cotisations sont régies par les statuts de l'association. N'étant pas un organisme agréé de dons déductibles, aucun reçu fiscal pour déduction d'impôt ne peut être émis. Les démarches d'adhésion s'effectuent exclusivement par échange individuel personnalisé ; aucun numéro de compte bancaire n'est publié sur ce site.",
      rights: "All rights reserved.",
      subTagline:
        "Communauté artistique à but non lucratif œuvrant pour le partage des arts traditionnels et la solidarité",
    },
    modals: {
      performance: {
        title: "Demander un spectacle",
        subtitle: "M01 · Performance Booking",
        orgLabel: "Nom de l'organisation / institution",
        orgPlaceholder: "Ex : Établissement de soins, mairie, ambassade...",
        contactNameLabel: "Nom du responsable",
        contactNamePlaceholder: "Ex : M. / Mme Dupont",
        contactPhoneLabel: "Numéro de téléphone",
        contactPhonePlaceholder: "010-0000-0000",
        preferredDatePlaceLabel: "Date et lieu souhaités",
        preferredDatePlacePlaceholder:
          "Ex : mi-octobre en après-midi, salle Bucheon",
        eventTypeLabel: "Nature de l'événement",
        eventTypes: {
          welfare: "Spectacle solidaire & soin",
          festival: "Festival local & culturel",
          diplomatic: "Protocole & diplomatie",
          other: "Autre",
        },
        notesLabel: "Détails de la demande (optionnel)",
        notesPlaceholder:
          "Nombre estimé de spectateurs, particularités de la salle...",
        privacyAgreedTitle:
          "[Requis] Collecte et traitement des données personnelles :",
        privacyAgreedText:
          "Les coordonnées et détails de l'événement sont recueillis uniquement pour l'organisation de la représentation et conservés pendant 1 an.",
        privacyError:
          "Veuillez accepter la politique de traitement des données.",
        submitButton: "Soumettre la demande de spectacle",
        kakaoButton: "Demande directe via KakaoTalk",
        successMessage:
          "Votre demande de spectacle a bien été enregistrée. Nous vous recontacterons dans les plus brefs délais.",
        errorMessage:
          "Une erreur est survenue lors de l'envoi. Veuillez nous contacter via KakaoTalk.",
      },
      member: {
        title: "Rejoindre la troupe (Membre)",
        subtitle: "M02 · Join as Performer",
        applicantNameLabel: "Nom du candidat",
        applicantNamePlaceholder: "Ex : Yeon-hee Kim",
        applicantPhoneLabel: "Numéro de téléphone",
        applicantPhonePlaceholder: "010-0000-0000",
        residentialAreaLabel: "Lieu de résidence",
        residentialAreaPlaceholder: "Ex : Bucheon, Incheon, Séoul...",
        specialtiesLabel: "Disciplines principales (choix multiples)",
        specialtyOptions: {
          janggu: "Janggu (Percussion sablier)",
          sogo: "Sogo (Petite percussion)",
          minyo: "Minyo (Chant folklorique)",
          other: "Autre (Buk, Kkwaenggwari, Taepyeongso)",
        },
        experienceLabel: "Expérience musicale et présentation",
        experiencePlaceholder:
          "Expérience en ensemble, cours suivis, motivations personnelles...",
        privacyAgreedTitle:
          "[Requis] Collecte et traitement des données personnelles :",
        privacyAgreedText:
          "Vos informations sont recueillies pour le suivi de candidature et conservées en toute sécurité jusqu'à l'issue du processus.",
        privacyError:
          "Veuillez accepter la politique de traitement des données.",
        specialtyError: "Veuillez sélectionner au moins une discipline.",
        submitButton: "Soumettre la candidature",
        kakaoButton: "Contacter via KakaoTalk",
        successMessage:
          "Votre candidature a été transmise avec succès. Notre équipe vous contactera sous peu.",
        errorMessage:
          "Une erreur est survenue lors de l'envoi. Veuillez nous contacter via KakaoTalk.",
      },
      supporter: {
        title: "Devenir membre bienfaiteur",
        subtitle: "M03 · Supporter Inquiry",
        legalNoticeBadge: "Notice légale (Association à but non lucratif)",
        legalNoticeDesc:
          "La troupe Yeonhui GYEOL est une association à but non lucratif enregistrée auprès du fisc de Bucheon. N'étant pas reconnue d'utilité publique déductible, aucun reçu fiscal pour déduction d'impôt ne peut être délivré. Les cotisations sont strictement dédiées à nos missions solidaires et artistiques. Nos coordonnées bancaires ne sont communiquées qu'individuellement lors d'échanges privés.",
        supporterNameLabel: "Nom complet ou Raison sociale",
        supporterNamePlaceholder: "Ex : Nom ou Nom d'entreprise",
        phoneLabel: "Numéro de téléphone",
        phonePlaceholder: "010-0000-0000",
        preferredMethodLabel: "Mode de contact privilégié",
        methods: {
          kakao: "Message texte / KakaoTalk",
          phone: "Appel téléphonique",
        },
        supportTypeLabel: "Type de soutien souhaité",
        types: {
          regular: "Adhésion de soutien régulière (mensuelle)",
          onetime: "Contribution ponctuelle",
        },
        cheeringLabel: "Un mot d'encouragement pour GYEOL (optionnel)",
        cheeringPlaceholder: "Partagez votre message bienveillant...",
        disclaimerCheckTitle:
          "[Requis] Non-délivrance de reçus fiscaux :",
        disclaimerCheckText:
          "J'ai pris connaissance que GYEOL est une association à but non lucratif ne délivrant pas de reçu de déduction fiscale et que les fonds sont alloués aux projets d'intérêt général.",
        privacyCheckTitle:
          "[Requis] Collecte et utilisation des données :",
        privacyCheckText:
          "Le nom et le contact sont collectés pour l'accompagnement individuel et conservés pendant 1 an.",
        disclaimerError:
          "Veuillez accepter la mention de non-délivrance de reçu fiscal.",
        privacyError:
          "Veuillez accepter le traitement des données personnelles.",
        submitButton: "Demander un contact personnalisé",
        kakaoButton: "Échanger sur KakaoTalk pour le mécénat",
        successMessage:
          "Votre demande d'information a été reçue. Un responsable vous contactera selon votre choix.",
        errorMessage:
          "Erreur lors de l'envoi. Veuillez nous contacter via KakaoTalk.",
      },
      digitalCard: {
        modalLabel: "Carte de visite numérique officielle - GYEOL",
        badge: "Official Digital Card",
        closeLabel: "Fermer la carte",
        repTitle: "Présidente",
        regLabel: "N° d'immatriculation",
        locLabel: "Siège",
        phoneLabel: "Tél. officiel",
        emailLabel: "E-mail",
        footerTag: "Communauté artistique solidaire à Bucheon",
        downloadVcard: "Enregistrer le contact vCard (.vcf)",
        copyLink: "Copier le lien de la page (notification)",
        copiedLink: "Lien copié !",
        copiedToast:
          "Lien copié dans le presse-papiers. Partagez-le via messagerie ou e-mail.",
      },
      archiveLightbox: {
        closeLabel: "Fermer l'aperçu",
        archiveNo: "GYEOL Archive No.",
      },
    },
  },
} as const;

type DeepString<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
  ? readonly DeepString<U>[]
  : T extends object
  ? { readonly [K in keyof T]: DeepString<T[K]> }
  : T;

export type TranslationSchema = DeepString<typeof translations.ko>;
