<?php

namespace App\Controller;

use App\Entity\Product;
use App\Form\ProductType;
use App\Repository\ProductRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class ProductController extends AbstractController
{
    #[Route('/products', name: 'product_index')]
    public function index(Request $request, EntityManagerInterface $em, ProductRepository $repo): Response
    {
        // Création d'un nouveau produit
        $product = new Product();
        $form = $this->createForm(ProductType::class, $product);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em->persist($product);
            $em->flush();

            $this->addFlash('success', 'Produit créé !');

            return $this->redirectToRoute('product_index');
        }

        // Récupération de tous les produits
        $products = $repo->findAll();

        return $this->render('product/index.html.twig', [
            'form' => $form->createView(),
            'products' => $products
        ]);
    }
}
