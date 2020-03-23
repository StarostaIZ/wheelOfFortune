<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200323124731 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE games CHANGE player2_id player2_id INT DEFAULT NULL, CHANGE player3_id player3_id INT DEFAULT NULL, CHANGE player4_id player4_id INT DEFAULT NULL, CHANGE word_id word_id INT DEFAULT NULL, CHANGE player2points player2points INT DEFAULT NULL, CHANGE player3points player3points INT DEFAULT NULL, CHANGE player4points player4points INT DEFAULT NULL, CHANGE max_points max_points INT DEFAULT NULL');
        $this->addSql('ALTER TABLE rooms ADD admin_id INT NOT NULL, CHANGE name name VARCHAR(255) DEFAULT NULL, CHANGE password password VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE rooms ADD CONSTRAINT FK_BD603592642B8210 FOREIGN KEY (admin_id) REFERENCES Users (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_BD603592642B8210 ON rooms (admin_id)');
        $this->addSql('ALTER TABLE users CHANGE roles roles JSON NOT NULL, CHANGE name name VARCHAR(255) DEFAULT NULL, CHANGE email email VARCHAR(255) DEFAULT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE Games CHANGE player2_id player2_id INT DEFAULT NULL, CHANGE player3_id player3_id INT DEFAULT NULL, CHANGE player4_id player4_id INT DEFAULT NULL, CHANGE word_id word_id INT DEFAULT NULL, CHANGE player2points player2points INT DEFAULT NULL, CHANGE player3points player3points INT DEFAULT NULL, CHANGE player4points player4points INT DEFAULT NULL, CHANGE max_points max_points INT DEFAULT NULL');
        $this->addSql('ALTER TABLE Rooms DROP FOREIGN KEY FK_BD603592642B8210');
        $this->addSql('DROP INDEX UNIQ_BD603592642B8210 ON Rooms');
        $this->addSql('ALTER TABLE Rooms DROP admin_id, CHANGE name name VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT \'NULL\' COLLATE `utf8mb4_unicode_ci`, CHANGE password password VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT \'NULL\' COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('ALTER TABLE Users CHANGE roles roles LONGTEXT CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_bin`, CHANGE name name VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT \'NULL\' COLLATE `utf8mb4_unicode_ci`, CHANGE email email VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT \'NULL\' COLLATE `utf8mb4_unicode_ci`');
    }
}
