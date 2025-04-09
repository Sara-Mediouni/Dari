const admin = require("firebase-admin");
const serviceAccount = require("./dari-28cfd-firebase-adminsdk-fbsvc-19a4019b91.json"); // Remplace par ton fichier JSON de la clé de service

admin.initializeApp({
  credential: admin.credential.cert( 
    projectId= "dari-28cfd",
    clientEmail= "firebase-adminsdk-fbsvc@dari-28cfd.iam.gserviceaccount.com",
    // Replace newlines in the private key
    privateKey= "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQD4LkmNUKL0ZTsE\ndbDY6YpTCDCj0fEwud13joaRIU7L9KiuIKttK732ZBjbQrD6EC/fXo2M9FY5tF4N\nP7zT2F1vxy/WfYuPKvot5CPtL2+AJopoN0plAd7KQJKuaDPrPsE8a7Zbw/IhSxPd\nJ5OEdmWvdsHBJluznYUPVj8iZUeE6rdMJSixPetdOm3GFqTHYZMVEJnowO2tODVd\njDVrYJNBncbpg9/i23bDZ93yJtARx0CTAXWnUPNxZtXPfgicamlHUang2YSYsyVh\n+M6EOk7rAzaL5dRBL14rNYrHpCOovWQTWyijT4XZiptZp93qqdoa1NfDgVbl9w+6\nfnXNv3arAgMBAAECggEAEvm1svcsNm56WDQdbOr891iZdh+/sV+Mq4RQt/j+0Cup\nLVh0cvjqDH7ebalIOckSDUyVRbvgJIesvJZCfES/RCQhKA+vo3yAO2Za9DAby4W8\nMGKwg/o5dr0AL2iVNlKKg3Gi3u+jluBpfjp1QNFX+KtQ/iZ40soORJFuFgBTZbnx\nSrz4KuBSo5kBCxhc0YNVEzhhw80fvx9Ppb6CJsFuZalhIHsHX3elnwit2mj7ODjB\nUtaAFqYWUQBSs2VRlnWmLtkJ/wxfO1SBEETTeoNXHSp3GIdQeXyuxLc23BdXo0ek\n3Dzs6W+GmfeOAUeTiXfVQtNpEq+SXeGkKacDxJoDFQKBgQD8XTaDEPhRuoDOPiSC\nwcQlJP8okK48VpRhXkaKueVv2f4royIEEQLKZwzIsmcm7Bz2QQ9sOee4yRpmfnoY\n34J7K3cKucHTceCjiREgL+kq1EEQ+g0kBD2tBV+Jf0UvFSOyToXA0NlkCbbtUrMh\nPsLy6vPMNj3GIOORVXsffRv3jwKBgQD7waUtRquVBk7QUyQt5eXYErencDFekddL\nmliD+so5qpzrCn9lUXmXcGA/sO/diZAn48E7t5nMwFQ3M2HxD38sN25NpM30sJ15\nMwGyxhojCGGXdORT/3nDiWA2+p6kvkeUBh6iaV+6PuMVq5h80xpFKoxrvVKzyRG4\nasKRieDhJQKBgQCbdgCCtQ2Dq1R1uKpdMmhWSXg10QrEeMFnSeBCzUmdobiFwTTP\nNHt3nAuwBtasj38349RQY0tv9dKhmQA2GloS7i+jF9NjIh+0HlfCcEE+9QowHxnB\nOiuUTl8QIKrJ2kfnK6ARq5Z/ncxmXi+jJzqI0lvlTPS4/MGzYek6+KMl2QKBgA93\nM+h2IPBEtO7DTMOtDdOaQsH8eGvw1aMFVk61R1sHiiA+Qtk8ihWth5wiCHo5iyuI\nKES84KvdXM8PTwL6Crvyo8oNR8GyX9okMgSDevOP/j7JpYUrepVyiQCXoMtKDSeg\nwJ0FkCXm2xhntDRm24RIOtwbg0scHQSROmaqa7ApAoGAVh1MX/SlqTM14Vku3rfu\nwq+kpfQuLJ8Pq5AtMgdPWP/b/0wjU39XeSuBfjwzAc9dbgIwDgVyh457pzv21XZ8\nDvFST8fHEll8n3oUPbtnQZnfBst7Gt1G5q93qc0UTYfc4jW44nPftYRQaa0k7UY8\nuG39TdvDqYkdbCh6UCYTYgA=\n-----END PRIVATE KEY-----\n"?.replace(/\\n/g, "\n"),)
});

module.exports = admin;