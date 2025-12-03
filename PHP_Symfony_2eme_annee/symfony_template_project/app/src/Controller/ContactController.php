<?php

namespace App\Controller;

use App\Entity\Product;
use App\Repository\ProductRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class ContactController extends AbstractController
{


    #[Route('/contacts', name: 'app_contact')]
    public function creerProduit(ProductRepository $productRepository): Response
    {


        return $this->render('contact/index.html.twig', [
            'telephone' => '01 81 00 30 30',
            'address' => '47 Bd de Pesaro, 92000 Nanterre'
        ]);
    }

    /*
    #[Route('/articles', name: 'app_articles')]
    public function index(): Response
    {

        $articles = [
            1 => ["titre" => "clavier"],
            2 => ["titre" => "souris"]

        ];

        //$articles = $articleRepository->findAll();

        return $this->render('articles/index.html.twig',
            [
            "articles" => $articles,
        ]
        );
    }

    */
}
