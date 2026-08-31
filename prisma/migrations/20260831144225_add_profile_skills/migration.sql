-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Profile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "skills" TEXT NOT NULL DEFAULT '',
    "email" TEXT NOT NULL,
    "location" TEXT,
    "resumeUrl" TEXT,
    "githubUrl" TEXT,
    "linkedinUrl" TEXT,
    "twitterUrl" TEXT,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Profile" ("bio", "email", "githubUrl", "id", "linkedinUrl", "location", "name", "resumeUrl", "title", "twitterUrl", "updatedAt") SELECT "bio", "email", "githubUrl", "id", "linkedinUrl", "location", "name", "resumeUrl", "title", "twitterUrl", "updatedAt" FROM "Profile";
DROP TABLE "Profile";
ALTER TABLE "new_Profile" RENAME TO "Profile";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
