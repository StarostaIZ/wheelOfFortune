<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200407123601 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE player (id INT AUTO_INCREMENT NOT NULL, user_id_id INT NOT NULL, game_id INT NOT NULL, username VARCHAR(255) NOT NULL, points INT NOT NULL, INDEX IDX_98197A659D86650F (user_id_id), INDEX IDX_98197A65E48FD905 (game_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE statistic (id INT AUTO_INCREMENT NOT NULL, date DATE NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE player ADD CONSTRAINT FK_98197A659D86650F FOREIGN KEY (user_id_id) REFERENCES Users (id)');
        $this->addSql('ALTER TABLE player ADD CONSTRAINT FK_98197A65E48FD905 FOREIGN KEY (game_id) REFERENCES Games (id)');
        $this->addSql('ALTER TABLE games DROP FOREIGN KEY FK_3EE204356A90CCA8');
        $this->addSql('ALTER TABLE games DROP FOREIGN KEY FK_3EE20435C0990423');
        $this->addSql('ALTER TABLE games DROP FOREIGN KEY FK_3EE20435D22CABCD');
        $this->addSql('ALTER TABLE games DROP FOREIGN KEY FK_3EE20435F747F411');
        $this->addSql('DROP INDEX IDX_3EE20435D22CABCD ON games');
        $this->addSql('DROP INDEX IDX_3EE204356A90CCA8 ON games');
        $this->addSql('DROP INDEX IDX_3EE20435C0990423 ON games');
        $this->addSql('DROP INDEX IDX_3EE20435F747F411 ON games');
        $this->addSql('ALTER TABLE games DROP player1_id, DROP player2_id, DROP player3_id, DROP player4_id, DROP player1points, DROP player2points, DROP player3points, DROP player4points, CHANGE word_id word_id INT DEFAULT NULL, CHANGE max_points max_points INT DEFAULT NULL');
        $this->addSql('ALTER TABLE rooms DROP is_offline, CHANGE name name VARCHAR(255) DEFAULT NULL, CHANGE password password VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE users DROP FOREIGN KEY FK_D5428AED54177093');
        $this->addSql('DROP INDEX IDX_D5428AED54177093 ON users');
        $this->addSql('ALTER TABLE users DROP room_id, DROP name, CHANGE roles roles JSON NOT NULL, CHANGE email email VARCHAR(255) DEFAULT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE player');
        $this->addSql('DROP TABLE statistic');
        $this->addSql('ALTER TABLE Games ADD player1_id INT NOT NULL, ADD player2_id INT DEFAULT NULL, ADD player3_id INT DEFAULT NULL, ADD player4_id INT DEFAULT NULL, ADD player1points INT NOT NULL, ADD player2points INT DEFAULT NULL, ADD player3points INT DEFAULT NULL, ADD player4points INT DEFAULT NULL, CHANGE word_id word_id INT DEFAULT NULL, CHANGE max_points max_points INT DEFAULT NULL');
        $this->addSql('ALTER TABLE Games ADD CONSTRAINT FK_3EE204356A90CCA8 FOREIGN KEY (player3_id) REFERENCES users (id)');
        $this->addSql('ALTER TABLE Games ADD CONSTRAINT FK_3EE20435C0990423 FOREIGN KEY (player1_id) REFERENCES users (id)');
        $this->addSql('ALTER TABLE Games ADD CONSTRAINT FK_3EE20435D22CABCD FOREIGN KEY (player2_id) REFERENCES users (id)');
        $this->addSql('ALTER TABLE Games ADD CONSTRAINT FK_3EE20435F747F411 FOREIGN KEY (player4_id) REFERENCES users (id)');
        $this->addSql('CREATE INDEX IDX_3EE20435D22CABCD ON Games (player2_id)');
        $this->addSql('CREATE INDEX IDX_3EE204356A90CCA8 ON Games (player3_id)');
        $this->addSql('CREATE INDEX IDX_3EE20435C0990423 ON Games (player1_id)');
        $this->addSql('CREATE INDEX IDX_3EE20435F747F411 ON Games (player4_id)');
        $this->addSql('ALTER TABLE Rooms ADD is_offline TINYINT(1) NOT NULL, CHANGE name name VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT \'NULL\' COLLATE `utf8mb4_unicode_ci`, CHANGE password password VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT \'NULL\' COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('ALTER TABLE Users ADD room_id INT DEFAULT NULL, ADD name VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT \'NULL\' COLLATE `utf8mb4_unicode_ci`, CHANGE roles roles LONGTEXT CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_bin`, CHANGE email email VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT \'NULL\' COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('ALTER TABLE Users ADD CONSTRAINT FK_D5428AED54177093 FOREIGN KEY (room_id) REFERENCES rooms (id)');
        $this->addSql('CREATE INDEX IDX_D5428AED54177093 ON Users (room_id)');
    }
}
