<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200420101638 extends AbstractMigration
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
        $this->addSql('ALTER TABLE rooms CHANGE game_id game_id INT DEFAULT NULL, CHANGE name name VARCHAR(255) DEFAULT NULL, CHANGE password password VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE users ADD room_id INT DEFAULT NULL, CHANGE roles roles JSON NOT NULL, CHANGE email email VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE users ADD CONSTRAINT FK_D5428AED54177093 FOREIGN KEY (room_id) REFERENCES Rooms (id)');
        $this->addSql('CREATE INDEX IDX_D5428AED54177093 ON users (room_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE Games CHANGE word_id word_id INT DEFAULT NULL, CHANGE max_points max_points INT DEFAULT NULL');
        $this->addSql('ALTER TABLE Rooms CHANGE game_id game_id INT DEFAULT NULL, CHANGE name name VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT \'NULL\' COLLATE `utf8mb4_unicode_ci`, CHANGE password password VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT \'NULL\' COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('ALTER TABLE Users DROP FOREIGN KEY FK_D5428AED54177093');
        $this->addSql('DROP INDEX IDX_D5428AED54177093 ON Users');
        $this->addSql('ALTER TABLE Users DROP room_id, CHANGE roles roles LONGTEXT CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_bin`, CHANGE email email VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT \'NULL\' COLLATE `utf8mb4_unicode_ci`');
    }
}
