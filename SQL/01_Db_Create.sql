USE [master]

IF db_id('CommuniTea') IS NULL
  CREATE DATABASE [CommuniTea]
GO

USE [CommuniTea]
GO


DROP TABLE IF EXISTS [UserProfile];
DROP TABLE IF EXISTS [Post];
DROP TABLE IF EXISTS [PostTag];
DROP TABLE IF EXISTS [Tag];
DROP TABLE IF EXISTS [Inspiration];
DROP TABLE IF EXISTS [Question];
DROP TABLE IF EXISTS [QuestionType];
DROP TABLE IF EXISTS [Answer];
GO

CREATE TABLE [UserProfile] (
  [Id] integer PRIMARY KEY IDENTITY,
  [FirebaseUserId] NVARCHAR(28) NOT NULL,
  [DisplayName] nvarchar(50) NOT NULL,
  [Email] nvarchar(555) NOT NULL,
  [Bio] nvarchar(555),
  [ImageLocation] nvarchar(255) NOT NULL,
  [Approved] BIT,
  [Pronouns] nvarchar(50) NOT NULL,

  CONSTRAINT UQ_FirebaseUserId UNIQUE(FirebaseUserId),
  CONSTRAINT UQ_Email UNIQUE(Email),
  CONSTRAINT UQ_DisplayName UNIQUE(DisplayName)
)

CREATE TABLE [Post] (
  [Id] integer PRIMARY KEY IDENTITY,
  [Content] text NOT NULL,
  [ImageLocation] nvarchar(255) NOT NULL,
  [UserProfileId] integer NOT NULL,

  CONSTRAINT [FK_Post_UserProfile] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
)

CREATE TABLE [Tag] (
  [Id] integer PRIMARY KEY IDENTITY,
  [Name] text NOT NULL
)

CREATE TABLE [PostTag] (
  [Id] integer PRIMARY KEY IDENTITY,
  [PostId] integer NOT NULL,
  [TagId] integer NOT NULL,
  
  CONSTRAINT [FK_PostTag_Post] FOREIGN KEY ([PostId]) REFERENCES [Post] ([Id]),
  CONSTRAINT [FK_PostTag_Tag] FOREIGN KEY ([TagId]) REFERENCES [Tag] ([Id])
)

CREATE TABLE [Inspiration] (
  [Id] integer PRIMARY KEY IDENTITY,
  [PostId] integer NOT NULL,
  [UserProfileId] integer NOT NULL,
  
  CONSTRAINT [FK_Inspiration_Post] FOREIGN KEY ([PostId]) REFERENCES [Post] ([Id]),
  CONSTRAINT [FK_Inspiration_UserProfile] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
)

CREATE TABLE [QuestionType] (
  [Id] integer PRIMARY KEY IDENTITY,
  [Name] nvarchar(100) NOT NULL
)

CREATE TABLE [Question] (
  [Id] integer PRIMARY KEY IDENTITY,
  [Content] text NOT NULL,
  [QuestionTypeId] integer NOT NULL,

  CONSTRAINT [FK_Question_QuestionType] FOREIGN KEY ([QuestionTypeId]) REFERENCES [QuestionType] ([Id])
)

CREATE TABLE [Answer] (
  [Id] integer PRIMARY KEY IDENTITY,
  [Content] text NOT NULL,
  [Correct] BIT NOT NULL,
  [QuestionId] integer NOT NULL,

  CONSTRAINT [FK_Answer_Question] FOREIGN KEY ([QuestionId]) REFERENCES [Question] ([Id])
)


GO