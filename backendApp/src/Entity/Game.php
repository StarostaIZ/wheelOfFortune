<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\GameRepository")
 */
class Game
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="games")
     * @ORM\JoinColumn(nullable=false)
     */
    private $player1;

    /**
     * @ORM\Column(type="integer")
     */
    private $player1points;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User")
     */
    private $player2;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $player2points;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User")
     */
    private $player3;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $player3points;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User")
     */
    private $player4;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $player4points;

    /**
     * @ORM\Column(type="boolean")
     */
    private $isRunning;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Word")
     */
    private $word;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $maxPoints;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPlayer1(): ?User
    {
        return $this->player1;
    }

    public function setPlayer1(?User $player1): self
    {
        $this->player1 = $player1;

        return $this;
    }

    public function getPlayer1points(): ?int
    {
        return $this->player1points;
    }

    public function setPlayer1points(int $player1points): self
    {
        $this->player1points = $player1points;

        return $this;
    }

    public function getPlayer2(): ?User
    {
        return $this->player2;
    }

    public function setPlayer2(?User $player2): self
    {
        $this->player2 = $player2;

        return $this;
    }

    public function getPlayer2points(): ?int
    {
        return $this->player2points;
    }

    public function setPlayer2points(?int $player2points): self
    {
        $this->player2points = $player2points;

        return $this;
    }

    public function getPlayer3(): ?User
    {
        return $this->player3;
    }

    public function setPlayer3(?User $player3): self
    {
        $this->player3 = $player3;

        return $this;
    }

    public function getPlayer3points(): ?int
    {
        return $this->player3points;
    }

    public function setPlayer3points(?int $player3points): self
    {
        $this->player3points = $player3points;

        return $this;
    }

    public function getPlayer4(): ?User
    {
        return $this->player4;
    }

    public function setPlayer4(?User $player4): self
    {
        $this->player4 = $player4;

        return $this;
    }

    public function getPlayer4points(): ?int
    {
        return $this->player4points;
    }

    public function setPlayer4points(?int $player4points): self
    {
        $this->player4points = $player4points;

        return $this;
    }

    public function getIsRunning(): ?bool
    {
        return $this->isRunning;
    }

    public function setIsRunning(bool $isRunning): self
    {
        $this->isRunning = $isRunning;

        return $this;
    }

    public function getWord(): ?Word
    {
        return $this->word;
    }

    public function setWord(?Word $word): self
    {
        $this->word = $word;

        return $this;
    }

    public function getMaxPoints(): ?int
    {
        return $this->maxPoints;
    }

    public function setMaxPoints(?int $maxPoints): self
    {
        $this->maxPoints = $maxPoints;

        return $this;
    }
}
