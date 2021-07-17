-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema todo_list
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema todo_list
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `todo_list` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `todo_list` ;

-- -----------------------------------------------------
-- Table `todo_list`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `todo_list`.`users` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(255) NULL DEFAULT NULL,
  `last_name` VARCHAR(255) NULL DEFAULT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 10
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE UNIQUE INDEX `user_id_UNIQUE` ON `todo_list`.`users` (`user_id` ASC) VISIBLE;

CREATE UNIQUE INDEX `email_UNIQUE` ON `todo_list`.`users` (`email` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `todo_list`.`notes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `todo_list`.`notes` (
  `note_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `noteTitle` VARCHAR(45) NULL DEFAULT NULL,
  `note` VARCHAR(255) NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`note_id`),
  CONSTRAINT `notes_ibfk_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `todo_list`.`users` (`user_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 20
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE UNIQUE INDEX `notes_id_UNIQUE` ON `todo_list`.`notes` (`note_id` ASC) VISIBLE;

CREATE INDEX `user_id` ON `todo_list`.`notes` (`user_id` ASC) VISIBLE;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
