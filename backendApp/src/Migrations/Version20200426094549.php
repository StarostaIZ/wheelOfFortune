<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200426094549 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE games CHANGE word_id word_id INT DEFAULT NULL, CHANGE max_points max_points INT DEFAULT NULL');
        $this->addSql('ALTER TABLE rooms DROP FOREIGN KEY FK_BD603592642B8210');
        $this->addSql('DROP INDEX UNIQ_BD603592642B8210 ON rooms');
        $this->addSql('ALTER TABLE rooms DROP admin_id, CHANGE game_id game_id INT DEFAULT NULL, CHANGE name name VARCHAR(255) DEFAULT NULL, CHANGE password password VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE users ADD is_room_admin TINYINT(1) NOT NULL, CHANGE room_id room_id INT DEFAULT NULL, CHANGE roles roles JSON NOT NULL, CHANGE email email VARCHAR(255) DEFAULT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE Games CHANGE word_id word_id INT DEFAULT NULL, CHANGE max_points max_points INT DEFAULT NULL');
        $this->addSql('ALTER TABLE Rooms ADD admin_id INT NOT NULL, CHANGE game_id game_id INT DEFAULT NULL, CHANGE name name VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT \'NULL\' COLLATE `utf8mb4_unicode_ci`, CHANGE password password VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT \'NULL\' COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('ALTER TABLE Rooms ADD CONSTRAINT FK_BD603592642B8210 FOREIGN KEY (admin_id) REFERENCES users (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_BD603592642B8210 ON Rooms (admin_id)');
        $this->addSql('ALTER TABLE Users DROP is_room_admin, CHANGE room_id room_id INT DEFAULT NULL, CHANGE roles roles LONGTEXT CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_bin`, CHANGE email email VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT \'NULL\' COLLATE `utf8mb4_unicode_ci`');
    }
}
