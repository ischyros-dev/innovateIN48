DROP DATABASE IF EXISTS innovateIN48;
CREATE DATABASE innovateIN48;
USE innovateIN48;

CREATE TABLE `Customer File`(
    CustomerFile_ID INT NOT NULL AUTO_INCREMENT,
    Username VARCHAR(10) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    FirstName VARCHAR(50) NOT NULL,
    PRIMARY KEY(CustomerFile_ID)
);

INSERT INTO `Customer File` VALUES(1, '1234567890', 'abc123', 'Testlname1', 'Yellow');
INSERT INTO `Customer File` VALUES(2, '1000000001', '123abc', 'Testlname2', 'Blue');
INSERT INTO `Customer File` VALUES(3, '1000000002', 'testpassword', 'Testlname3', 'Green');

CREATE TABLE `Accounts Master File`(
    AccountsMasterFile_ID INT NOT NULL AUTO_INCREMENT,
    CustomerNumber VARCHAR(10) NOT NULL,
    AccountNumber VARCHAR(12) NOT NULL,
    Balance DECIMAL(12, 2) NOT NULL,
    PRIMARY KEY(AccountsMasterFile_ID)
);

INSERT INTO `Accounts Master File` VALUES(1, '1234567890', '100444000001', 10024.31);
INSERT INTO `Accounts Master File` VALUES(2, '1234567890', '100444000005', 75.69);
INSERT INTO `Accounts Master File` VALUES(3, '1000000001', '100444000002', 15500.01);
INSERT INTO `Accounts Master File` VALUES(4, '1000000002', '100444000003', 0.00);
INSERT INTO `Accounts Master File` VALUES(5, '1000000002', '100444000004', 100.00);


CREATE TABLE `Transaction File`(
    TransactionFile_ID INT NOT NULL AUTO_INCREMENT,
    CustomerNumber VARCHAR(10) NOT NULL,
    AccountNumber VARCHAR(12) NOT NULL,
    Tran_ID VARCHAR(13) NOT NULL,
    Tran_DateTime DATETIME NOT NULL,
    Tran_Type VARCHAR(15) NOT NULL,
    Tran_Amount DECIMAL(12, 2) NOT NULL,
    PRIMARY KEY(TransactionFile_ID)
);

INSERT INTO `Transaction File` VALUES(1, '1234567890', '100444000001', CONCAT('TXN', LPAD(TransactionFile_ID, 10, 0)), '2021-01-15 12:30:00', 'Deposit', 20000.00);
INSERT INTO `Transaction File` VALUES(2, '1000000001', '100444000002', CONCAT('TXN', LPAD(TransactionFile_ID, 10, 0)), '2021-01-15 14:00:05', 'Deposit', 10000.00);
INSERT INTO `Transaction File` VALUES(3, '1000000002', '100444000004', CONCAT('TXN', LPAD(TransactionFile_ID, 10, 0)), '2021-02-03 09:45:01', 'Deposit', 3100.00);
INSERT INTO `Transaction File` VALUES(4, '1234567890', '100444000001', CONCAT('TXN', LPAD(TransactionFile_ID, 10, 0)), '2021-02-15 12:15:04', 'Deposit', 30000.00);
INSERT INTO `Transaction File` VALUES(5, '1234567890', '100444000005', CONCAT('TXN', LPAD(TransactionFile_ID, 10, 0)), '2021-02-27 12:14:23', 'Deposit', 100.00);
INSERT INTO `Transaction File` VALUES(6, '1000000001', '100444000002', CONCAT('TXN', LPAD(TransactionFile_ID, 10, 0)), '2021-03-01 13:13:00', 'Deposit', 5500.01);
INSERT INTO `Transaction File` VALUES(7, '1234567890', '100444000005', CONCAT('TXN', LPAD(TransactionFile_ID, 10, 0)), '2021-03-05 12:13:33', 'Withdrawal', 24.31);
INSERT INTO `Transaction File` VALUES(8, '1234567890', '100444000001', CONCAT('TXN', LPAD(TransactionFile_ID, 10, 0)), '2021-03-05 12:16:12', 'Deposit', 24.31);
INSERT INTO `Transaction File` VALUES(9, '1000000002', '100444000004', CONCAT('TXN', LPAD(TransactionFile_ID, 10, 0)), '2021-03-15 10:01:00', 'Withdrawal', 1500.00);
INSERT INTO `Transaction File` VALUES(10, '1000000002', '100444000004', CONCAT('TXN', LPAD(TransactionFile_ID, 10, 0)), '2021-03-31 10:08:54', 'Withdrawal', 1500.00);
INSERT INTO `Transaction File` VALUES(11, '1234567890', '100444000001', CONCAT('TXN', LPAD(TransactionFile_ID, 10, 0)), '2021-04-03 09:05:46', 'Deposit', 50000.00);

