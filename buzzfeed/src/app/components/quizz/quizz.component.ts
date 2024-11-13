import { Component, OnInit } from '@angular/core';
import quizz_questions from '../../../assets/data/quizz_questions.json'

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrl: './quizz.component.css'
})

export class QuizzComponent implements OnInit {

  title:string = "";

  questions:any;
  questionSelected:any ;

  answers:string[] = [];
  answerSelected:string = "";

  questionIndex:number =0;
  questionMaxIndex:number=0;

  finished:boolean = false;

  constructor(){}
  ngOnInit(): void {
    if(quizz_questions){
      this.finished = false;
      this.title = quizz_questions.title;

      this.questions = quizz_questions.questions;
      this.questionSelected = this.questions[this.questionIndex];

      this.questionIndex = 0; /*Pega o Index da pergunta, por logica, depois ele ira aumentar*/
      this.questionMaxIndex = this.questions.length; /*Pega a quantidade de perguntas totais */

      console.log(this.questionIndex);
      console.log(this.questionMaxIndex);
      console.log(quizz_questions.questions[0]);

    }
  }
  playerChoose(value:string) { /**VALUE VAI SER O ALIAS == A/B */
    this.answers.push(value); /*PUSH FAZ O ELEMENTO ENTRAR NO ARRAY */
    this.nextStep();
}

//   ATE AQUI ELE AINDA NAO ESTA INDO PARA O PROXIMA PERGUNTA, DESSA FORMA, VAMOS ...
  async nextStep(){
    this.questionIndex+=1;
    if (this.questionMaxIndex>this.questionIndex){
        this.questionSelected=this.questions[this.questionIndex];
    }else{
        this.finished = true;
        // VERIFICAR OPCAO GANHADORA
        /**METODO STATICO QUE AVALIA SE TEM MAIS A DO QUE B */
        const finalAnswer:string = await this.checkResults(this.answers);
        this.answerSelected = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results];
        /** ELE DIZ QUE '...as keyof typeof...' É DO MESMO TIPO QUE O TIPO SALVO EM DATA...quizz...  */
    }
    console.log(this.answers)
}

    async checkResults(answers:string[]){
        const result = answers.reduce((previous, current, i, arr)=> {
            if((arr.filter(item => item ===previous).length )>
            (arr.filter(item => item ===current).length)){
                return previous;
            }else{
                return current
            }
        })
    return result
    }
}
