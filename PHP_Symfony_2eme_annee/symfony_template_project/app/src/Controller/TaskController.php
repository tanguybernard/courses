<?php

namespace App\Controller;

use App\Entity\Task;
use App\Form\TaskType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class TaskController extends AbstractController
{
    #[Route('/task', name: 'app_task')]
    public function index(): Response
    {

        $form = $this->createForm(TaskType::class, null, [
            'action' => $this->generateUrl('app_task_save'),
            'method' => 'POST'
        ]);

        return $this->render('task/index.html.twig', [
            'monFormulaireTaches' => $form->createView()
        ]);
    }

    #[Route('/task/save', name: 'app_task_save')]
    public function sauvegarder(Request $request){

        //Accès au donnée du formulaire
        $formData = $request->request->all('task');

        //Retourne le nom de la tache
        return new Response($formData['name']);
    }
}
