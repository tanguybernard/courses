<?php

namespace App\Controller;

use App\Entity\Product;
use App\Entity\Comment;
use App\Form\ProductType;
use App\Form\CommentType;
use App\Repository\ProductRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class ProductController extends AbstractController
{
    // Reste la méthode pour la liste et la création de produits
    #[Route('/products', name: 'product_index', methods: ['GET', 'POST'])]
    public function index(Request $request, EntityManagerInterface $em, ProductRepository $repo): Response
    {
        $product = new Product();
        $form = $this->createForm(ProductType::class, $product);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em->persist($product);
            $em->flush();

            $this->addFlash('success', 'Produit créé !');

            return $this->redirectToRoute('product_index');
        }

        $products = $repo->findAll();

        return $this->render('product/index.html.twig', [
            'form' => $form->createView(),
            'products' => $products
        ]);
    }

    // Affiche les détails du produit et prépare le formulaire de commentaire
    #[Route('/products/{id}', name: 'product_show', methods: ['GET'])]
    public function show(Product $product): Response
    {
        // On crée un formulaire de commentaire vide, il sera soumis à la route 'comment_new'
        $comment = new Comment();
        $commentForm = $this->createForm(CommentType::class, $comment);

        return $this->render('product/show.html.twig', [
            'product' => $product,
            'commentForm' => $commentForm->createView(),
        ]);
    }

    // --- NOUVELLES MÉTHODES POUR LES COMMENTAIRES ---

    // Récupère les commentaires d'un produit (GET /products/{id}/comments)
    #[Route('/products/{id}/comments', name: 'product_comments_index', methods: ['GET'])]
    public function productComments(Product $product): Response
    {
        // Cette route peut être utilisée pour un affichage AJAX par exemple.
        // Ici, on retourne les commentaires pour l'affichage standard.
        return $this->render('product/_comments_list.html.twig', [
            'product' => $product,
            'comments' => $product->getComments(),
        ]);
    }

    // Ajoute un commentaire à un produit (POST /products/{id}/comments)
    #[Route('/products/{id}/comments', name: 'comment_new', methods: ['POST'])]
    public function newComment(Product $product, Request $request, EntityManagerInterface $em): Response
    {
        $comment = new Comment();
        $commentForm = $this->createForm(CommentType::class, $comment);

        $commentForm->handleRequest($request);

        // Si le formulaire est soumis et valide
        if ($commentForm->isSubmitted() && $commentForm->isValid()) {
            $comment->setProduct($product);

            $em->persist($comment);
            $em->flush();

            $this->addFlash('success', 'Commentaire ajouté avec succès !');
        } else {
            // Optionnel : Gérer l'erreur si le formulaire n'est pas valide
            // Si vous êtes en AJAX, vous renverriez un JSON d'erreur.
            // Pour un formulaire HTML classique, nous redirigeons simplement vers la page.
            $this->addFlash('error', 'Le commentaire n\'a pas pu être ajouté (champs invalides).');
        }

        // Redirection vers la page d'affichage du produit, quel que soit le résultat
        return $this->redirectToRoute('product_show', ['id' => $product->getId()]);
    }

    // Suppression d'un commentaire (reste la même logique, mais pourrait aussi être /comments/{id} en REST pur)
    #[Route('/comments/{id}/delete', name: 'comment_delete', methods: ['POST'])]
    public function deleteComment(Comment $comment, EntityManagerInterface $em, Request $request): Response
    {
        $productId = $comment->getProduct()->getId(); // ID du produit pour la redirection

        // Sécurité : vérifier le token CSRF
        if ($this->isCsrfTokenValid('delete' . $comment->getId(), $request->request->get('_token'))) {
            $em->remove($comment);
            $em->flush();

            $this->addFlash('success', 'Commentaire supprimé !');
        }

        // Redirection vers la page du produit
        return $this->redirectToRoute('product_show', ['id' => $productId]);
    }
}
