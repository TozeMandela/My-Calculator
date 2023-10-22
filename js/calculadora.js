
((win, doc)=>{

   let $input = doc.querySelector('.view');
   let $igual = doc.querySelector('.igual');
   let $response = doc.querySelector('.answer div');
   let $number = doc.querySelectorAll('.number');
   let $signal = doc.querySelectorAll('.sinal');
   let history = '0';

    $number.forEach(el => {
        el.addEventListener('click', (e)=>{
            if ($input.value == '0') return $input.value = e.target.innerHTML;

            return $input.value += e.target.innerHTML
        })
    });

    $signal.forEach(el => {
        el.addEventListener('click', (e)=>{
           calculator(el.classList[0]);
        });
    });

    $igual.addEventListener('click', (e)=>{
        calculator(e.target.classList[0])                
    })

    function calculator (key){
        switch (key) {
            case 'CE':
                return $input.value = '';

            case 'Delete':
                $response.innerHTML = '';
                return $input.value = ''

            case 'Backspace':
                let aux = $input.value.split('');
                if(isNaN(aux[aux.length-1]) && (aux[aux.length-1] !== 'e' || aux[aux.length-1] !== 'E')) return $input.value = '';

                aux.pop();
                if(aux.length == 0) return $input.value = '';

                return $input.value = aux.join('');

            case 'divX':
                $response.innerHTML = `1 ÷ ${$input.value}`;
                return $input.value = eval(`1/${$input.value}`);

            case 'exp2':
                $response.innerHTML = `${$input.value} X ${$input.value}`;
                return $input.value = eval(`${$input.value}*${$input.value}`);

            case 'sqrt':
                $response.innerHTML = `sqrt(${$input.value})`;
                return $input.value = Math.sqrt($input.value);
            break;

            case '+':
            case '-':
            case '/':
            case '*':
                if(!$response.innerHTML && !$input.value) return $response.innerHTML = `0 ${key}`;

                if(isNaN($input.value)) return $input.value = '';

                if(!$response.innerHTML) {
                    $response.innerHTML = `${$input.value} ${key}`;
                    history = `${key} ${$input.value}`;
                    return $input.value = ''
                }

                if($response.innerHTML.split(' ').length > 2) {
                    $response.innerHTML = `${$input.value} ${key}`;
                    return $input.value = ''
                }

                $input.value = eval(`${$response.innerHTML} ${$input.value}`); 
                $response.innerHTML = `${$input.value} ${key}`;
                
                return $input.value = '' 
            
            case 'igual':

                if(!$input.value){  
                    if($response.innerHTML){
                        if($response.innerHTML.split(' ').length == 2) $response.innerHTML = `${$response.innerHTML} ${history.split(' ')[1]}`;
                    }
                }else{
                    if($response.innerHTML.split(' ').length > 2) { 
                        calculator(history.split(' ')[0]);
                        $response.innerHTML = `${$response.innerHTML} ${history.split(' ')[1]}`
                    }else{
                        if($response.innerHTML.split(' ').length == 1) return;
                        
                        $response.innerHTML = `${$response.innerHTML} ${$input.value}`;
                    }
                }

                $input.value = eval(`${$response.innerHTML}`);
                break; 
        }

    }

})(window, document);


// document.addEventListener('keydown', (e)=>{
//     console.log(e.key);
// })