<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200407143151 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE friend_request DROP FOREIGN KEY FK_F284D949D86650F');
        $this->addSql('ALTER TABLE friend_request DROP FOREIGN KEY FK_F284D94DFD406F3');
        $this->addSql('DROP INDEX IDX_F284D94DFD406F3 ON friend_request');
        $this->addSql('DROP INDEX IDX_F284D949D86650F ON friend_request');
        $this->addSql('ALTER TABLE friend_request ADD user_id INT NOT NULL, ADD friend_id INT NOT NULL, DROP user_id_id, DROP friend_id_id');
        $this->addSql('ALTER TABLE friend_request ADD CONSTRAINT FK_F284D94A76ED395 FOREIGN KEY (user_id) REFERENCES Users (id)');
        $this->addSql('ALTER TABLE friend_request ADD CONSTRAINT FK_F284D946A5458E8 FOREIGN KEY (friend_id) REFERENCES Users (id)');
        $this->addSql('CREATE INDEX IDX_F284D94A76ED395 ON friend_request (user_id)');
        $this->addSql('CREATE INDEX IDX_F284D946A5458E8 ON friend_request (friend_id)');
        $this->addSql('ALTER TABLE games CHANGE word_id word_id INT DEFAULT NULL, CHANGE max_points max_points INT DEFAULT NULL');
        $this->addSql('ALTER TABLE player DROP FOREIGN KEY FK_98197A659D86650F');
        $this->addSql('DROP INDEX IDX_98197A659D86650F ON player');
        $this->addSql('ALTER TABLE player CHANGE user_id_id user_id INT NOT NULL');
        $this->addSql('ALTER TABLE player ADD CONSTRAINT FK_98197A65A76ED395 FOREIGN KEY (user_id) REFERENCES Users (id)');
        $this->addSql('CREATE INDEX IDX_98197A65A76ED395 ON player (user_id)');
        $this->addSql('ALTER TABLE rooms CHANGE name name VARCHAR(255) DEFAULT NULL, CHANGE password password VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE users CHANGE roles roles JSON NOT NULL, CHANGE email email VARCHAR(255) DEFAULT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE friend_request DROP FOREIGN KEY FK_F284D94A76ED395');
        $this->addSql('ALTER TABLE friend_request DROP FOREIGN KEY FK_F284D946A5458E8');
        $this->addSql('DROP INDEX IDX_F284D94A76ED395 ON friend_request');
        $this->addSql('DROP INDEX IDX_F284D946A5458E8 ON friend_request');
        $this->addSql('ALTER TABLE friend_request ADD user_id_id INT NOT NULL, ADD friend_id_id INT NOT NULL, DROP user_id, DROP friend_id');
        $this->addSql('ALTER TABLE friend_request ADD CONSTRAINT FK_F284D949D86650F FOREIGN KEY (user_id_id) REFERENCES users (id)');
        $this->addSql('ALTER TABLE friend_request ADD CONSTRAINT FK_F284D94DFD406F3 FOREIGN KEY (friend_id_id) REFERENCES users (id)');
        $this->addSql('CREATE INDEX IDX_F284D94DFD406F3 ON friend_request (friend_id_id)');
        $this->addSql('CREATE INDEX IDX_F284D949D86650F ON friend_request (user_id_id)');
        $this->addSql('ALTER TABLE Games CHANGE word_id word_id INT DEFAULT NULL, CHANGE max_points max_points INT DEFAULT NULL');
        $this->addSql('ALTER TABLE player DROP FOREIGN KEY FK_98197A65A76ED395');
        $this->addSql('DROP INDEX IDX_98197A65A76ED395 ON player');
        $this->addSql('ALTER TABLE player CHANGE user_id user_id_id INT NOT NULL');
        $this->addSql('ALTER TABLE player ADD CONSTRAINT FK_98197A659D86650F FOREIGN KEY (user_id_id) REFERENCES users (id)');
        $this->addSql('CREATE INDEX IDX_98197A659D86650F ON player (user_id_id)');
        $this->addSql('ALTER TABLE Rooms CHANGE name name VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT \'NULL\' COLLATE `utf8mb4_unicode_ci`, CHANGE password password VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT \'NULL\' COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('ALTER TABLE Users CHANGE roles roles LONGTEXT CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_bin`, CHANGE email email VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT \'NULL\' COLLATE `utf8mb4_unicode_ci`');
    }
}
