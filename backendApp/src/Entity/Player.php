<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\PlayerRepository")
 */
class Player
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="gamesPlayed")
     * @ORM\JoinColumn(nullable=false)
     */
    private $user;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $username;

    /**
     * @ORM\Column(type="integer")
     */
    private $points;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Game", inversedBy="players")
     * @ORM\JoinColumn(nullable=false)
     */
    private $game;

    /**
     * @ORM\Column(type="boolean")
     */
    private $isNow = false;

    /**
     * @ORM\Column(type="boolean")
     */
    private $isWinner = false;

    /**
     * @ORM\Column(type="integer")
     */
    private $currentPoints = 0;

    /**
     * @ORM\Column(type="date")
     */
    private $creationDate;

    /**
     * @ORM\Column(type="integer")
     */
    private $guessedWords = 0;

    public function __construct()
    {
        $this->creationDate = new \DateTime();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getUsername(): ?string
    {
        return $this->username;
    }

    public function setUsername(string $username): self
    {
        $this->username = $username;

        return $this;
    }

    public function getPoints(): ?int
    {
        return $this->points;
    }

    public function setPoints(int $points): self
    {
        $this->points = $points;

        return $this;
    }

    public function addPointsAfterWin()
    {
        $this->points+=$this->currentPoints+1000;
    }

    public function getGame(): ?Game
    {
        return $this->game;
    }

    public function setGame(?Game $game): self
    {
        $this->game = $game;

        return $this;
    }

    public function getIsNow(): ?bool
    {
        return $this->isNow;
    }

    public function setIsNow(bool $isNow): self
    {
        $this->isNow = $isNow;

        return $this;
    }

    public function getIsWinner(): ?bool
    {
        return $this->isWinner;
    }

    public function setIsWinner(bool $isWinner): self
    {
        $this->isWinner = $isWinner;

        return $this;
    }

    public function getCurrentPoints(): ?int
    {
        return $this->currentPoints;
    }

    public function setCurrentPoints(int $currentPoints): self
    {
        $this->currentPoints = $currentPoints;

        return $this;
    }

    public function getCreationDate(): ?\DateTimeInterface
    {
        return $this->creationDate;
    }

    public function setCreationDate(\DateTimeInterface $creationDate): self
    {
        $this->creationDate = $creationDate;

        return $this;
    }

    public function getGuessedWords(): ?int
    {
        return $this->guessedWords;
    }

    public function setGuessedWords(int $guessedWords): self
    {
        $this->guessedWords = $guessedWords;

        return $this;
    }

    public function incrementGuessedWords(){
        $this->guessedWords++;
    }
}
