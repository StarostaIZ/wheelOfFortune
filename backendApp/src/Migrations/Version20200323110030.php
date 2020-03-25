<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200323110030 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE word DROP FOREIGN KEY FK_C3F1751112469DE2');
        $this->addSql('ALTER TABLE room DROP FOREIGN KEY FK_729F519BE48FD905');
        $this->addSql('ALTER TABLE game DROP FOREIGN KEY FK_232B318C6A90CCA8');
        $this->addSql('ALTER TABLE game DROP FOREIGN KEY FK_232B318CC0990423');
        $this->addSql('ALTER TABLE game DROP FOREIGN KEY FK_232B318CD22CABCD');
        $this->addSql('ALTER TABLE game DROP FOREIGN KEY FK_232B318CF747F411');
        $this->addSql('ALTER TABLE user_user DROP FOREIGN KEY FK_F7129A80233D34C1');
        $this->addSql('ALTER TABLE user_user DROP FOREIGN KEY FK_F7129A803AD8644E');
        $this->addSql('ALTER TABLE game DROP FOREIGN KEY FK_232B318CE357438D');
        $this->addSql('CREATE TABLE Categories (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE Games (id INT AUTO_INCREMENT NOT NULL, player1_id INT NOT NULL, player2_id INT DEFAULT NULL, player3_id INT DEFAULT NULL, player4_id INT DEFAULT NULL, word_id INT DEFAULT NULL, player1points INT NOT NULL, player2points INT DEFAULT NULL, player3points INT DEFAULT NULL, player4points INT DEFAULT NULL, is_running TINYINT(1) NOT NULL, max_points INT DEFAULT NULL, INDEX IDX_3EE20435C0990423 (player1_id), INDEX IDX_3EE20435D22CABCD (player2_id), INDEX IDX_3EE204356A90CCA8 (player3_id), INDEX IDX_3EE20435F747F411 (player4_id), INDEX IDX_3EE20435E357438D (word_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE Rooms (id INT AUTO_INCREMENT NOT NULL, game_id INT NOT NULL, name VARCHAR(255) DEFAULT NULL, password VARCHAR(255) DEFAULT NULL, is_offline TINYINT(1) NOT NULL, max_people INT NOT NULL, UNIQUE INDEX UNIQ_BD603592E48FD905 (game_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE Users (id INT AUTO_INCREMENT NOT NULL, username VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, name VARCHAR(255) DEFAULT NULL, email VARCHAR(255) DEFAULT NULL, UNIQUE INDEX UNIQ_D5428AEDF85E0677 (username), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE friends (user_id INT NOT NULL, friend_user_id INT NOT NULL, INDEX IDX_21EE7069A76ED395 (user_id), INDEX IDX_21EE706993D1119E (friend_user_id), PRIMARY KEY(user_id, friend_user_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE Words (id INT AUTO_INCREMENT NOT NULL, category_id INT NOT NULL, word VARCHAR(255) NOT NULL, INDEX IDX_B0BC318812469DE2 (category_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE Games ADD CONSTRAINT FK_3EE20435C0990423 FOREIGN KEY (player1_id) REFERENCES Users (id)');
        $this->addSql('ALTER TABLE Games ADD CONSTRAINT FK_3EE20435D22CABCD FOREIGN KEY (player2_id) REFERENCES Users (id)');
        $this->addSql('ALTER TABLE Games ADD CONSTRAINT FK_3EE204356A90CCA8 FOREIGN KEY (player3_id) REFERENCES Users (id)');
        $this->addSql('ALTER TABLE Games ADD CONSTRAINT FK_3EE20435F747F411 FOREIGN KEY (player4_id) REFERENCES Users (id)');
        $this->addSql('ALTER TABLE Games ADD CONSTRAINT FK_3EE20435E357438D FOREIGN KEY (word_id) REFERENCES Words (id)');
        $this->addSql('ALTER TABLE Rooms ADD CONSTRAINT FK_BD603592E48FD905 FOREIGN KEY (game_id) REFERENCES Games (id)');
        $this->addSql('ALTER TABLE friends ADD CONSTRAINT FK_21EE7069A76ED395 FOREIGN KEY (user_id) REFERENCES Users (id)');
        $this->addSql('ALTER TABLE friends ADD CONSTRAINT FK_21EE706993D1119E FOREIGN KEY (friend_user_id) REFERENCES Users (id)');
        $this->addSql('ALTER TABLE Words ADD CONSTRAINT FK_B0BC318812469DE2 FOREIGN KEY (category_id) REFERENCES Categories (id)');
        $this->addSql('DROP TABLE category');
        $this->addSql('DROP TABLE game');
        $this->addSql('DROP TABLE room');
        $this->addSql('DROP TABLE user');
        $this->addSql('DROP TABLE user_user');
        $this->addSql('DROP TABLE word');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE Words DROP FOREIGN KEY FK_B0BC318812469DE2');
        $this->addSql('ALTER TABLE Rooms DROP FOREIGN KEY FK_BD603592E48FD905');
        $this->addSql('ALTER TABLE Games DROP FOREIGN KEY FK_3EE20435C0990423');
        $this->addSql('ALTER TABLE Games DROP FOREIGN KEY FK_3EE20435D22CABCD');
        $this->addSql('ALTER TABLE Games DROP FOREIGN KEY FK_3EE204356A90CCA8');
        $this->addSql('ALTER TABLE Games DROP FOREIGN KEY FK_3EE20435F747F411');
        $this->addSql('ALTER TABLE friends DROP FOREIGN KEY FK_21EE7069A76ED395');
        $this->addSql('ALTER TABLE friends DROP FOREIGN KEY FK_21EE706993D1119E');
        $this->addSql('ALTER TABLE Games DROP FOREIGN KEY FK_3EE20435E357438D');
        $this->addSql('CREATE TABLE category (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE game (id INT AUTO_INCREMENT NOT NULL, player1_id INT NOT NULL, player2_id INT DEFAULT NULL, player3_id INT DEFAULT NULL, player4_id INT DEFAULT NULL, word_id INT DEFAULT NULL, player1points INT NOT NULL, player2points INT DEFAULT NULL, player3points INT DEFAULT NULL, player4points INT DEFAULT NULL, is_running TINYINT(1) NOT NULL, max_points INT DEFAULT NULL, INDEX IDX_232B318CC0990423 (player1_id), INDEX IDX_232B318CF747F411 (player4_id), INDEX IDX_232B318CD22CABCD (player2_id), INDEX IDX_232B318CE357438D (word_id), INDEX IDX_232B318C6A90CCA8 (player3_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE room (id INT AUTO_INCREMENT NOT NULL, game_id INT NOT NULL, name VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT \'NULL\' COLLATE `utf8mb4_unicode_ci`, password VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT \'NULL\' COLLATE `utf8mb4_unicode_ci`, is_offline TINYINT(1) NOT NULL, max_people INT NOT NULL, UNIQUE INDEX UNIQ_729F519BE48FD905 (game_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, username VARCHAR(180) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, roles LONGTEXT CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_bin`, password VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, name VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT \'NULL\' COLLATE `utf8mb4_unicode_ci`, email VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT \'NULL\' COLLATE `utf8mb4_unicode_ci`, UNIQUE INDEX UNIQ_8D93D649F85E0677 (username), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE user_user (user_source INT NOT NULL, user_target INT NOT NULL, INDEX IDX_F7129A803AD8644E (user_source), INDEX IDX_F7129A80233D34C1 (user_target), PRIMARY KEY(user_source, user_target)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE word (id INT AUTO_INCREMENT NOT NULL, category_id INT NOT NULL, word VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, INDEX IDX_C3F1751112469DE2 (category_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE game ADD CONSTRAINT FK_232B318C6A90CCA8 FOREIGN KEY (player3_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE game ADD CONSTRAINT FK_232B318CC0990423 FOREIGN KEY (player1_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE game ADD CONSTRAINT FK_232B318CD22CABCD FOREIGN KEY (player2_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE game ADD CONSTRAINT FK_232B318CE357438D FOREIGN KEY (word_id) REFERENCES word (id)');
        $this->addSql('ALTER TABLE game ADD CONSTRAINT FK_232B318CF747F411 FOREIGN KEY (player4_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE room ADD CONSTRAINT FK_729F519BE48FD905 FOREIGN KEY (game_id) REFERENCES game (id)');
        $this->addSql('ALTER TABLE user_user ADD CONSTRAINT FK_F7129A80233D34C1 FOREIGN KEY (user_target) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE user_user ADD CONSTRAINT FK_F7129A803AD8644E FOREIGN KEY (user_source) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE word ADD CONSTRAINT FK_C3F1751112469DE2 FOREIGN KEY (category_id) REFERENCES category (id)');
        $this->addSql('DROP TABLE Categories');
        $this->addSql('DROP TABLE Games');
        $this->addSql('DROP TABLE Rooms');
        $this->addSql('DROP TABLE Users');
        $this->addSql('DROP TABLE friends');
        $this->addSql('DROP TABLE Words');
    }
}
