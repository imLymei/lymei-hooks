# @lymei/hooks

Este pacote npm fornece uma coleção de custom hooks do React para funcionalidades comuns. Esses hooks foram projetados para melhorar a experiência de desenvolvimento e simplificar a gestão de várias tarefas em aplicações React.

## Hooks

### `useWindowSize`

Este hook permite que você obtenha o tamanho atual da janela do navegador como um objeto contendo as propriedades `width` e `height`.

#### Uso

```jsx
import { useWindowSize } from '@lymei/hooks';

function MeuComponente() {
  const tamanhoJanela = useWindowSize();

  // Acesse tamanhoJanela.width e tamanhoJanela.height para a sua lógica

  return (
    // Seu JSX do componente
  );
}
```

### `useScroll`

Este hook fornece informações em tempo real sobre a posição de rolagem da janela, retornando um objeto contendo a posição atual de rolagem em pixels e a porcentagem de rolagem em relação à altura total da janela.

#### Uso

```jsx
import { useScroll } from '@lymei/hooks';

function MeuComponente() {
  const scroll = useScroll();

  // Agora você pode acessar a posição de rolagem e a porcentagem.
  console.log('Posição de Rolagem:', scroll.number);
  console.log('Porcentagem de Rolagem:', scroll.percentage);

  return (
    // Seu JSX aqui
  );
}

```

### `useLocalStorage`

Este hook facilita a gestão de dados no armazenamento local (local storage). Ele recupera um item armazenado no local storage ou cria um novo item, e atualiza automaticamente o valor armazenado quando ele é alterado.

#### Uso

```jsx
import { useLocalStorage } from '@lymei/hooks';

function MeuComponente() {
  const [dadosArmazenados, setDadosArmazenados] = useLocalStorage('meusDadosArmazenados', 'valor padrão');

  // Acesse dadosArmazenados para a sua lógica e setDadosArmazenados para atualizar o valor

  return (
    // Seu JSX do componente
  );
}
```

### `useMouse`

O hook `useMouse` permite que você rastreie a posição atual do mouse dentro da janela.

#### Uso

```jsx
import { useMouse } from '@lymei/hooks';

function MeuComponente() {
  const posicaoMouse = useMouse();

  // Acesse posicaoMouse.x e posicaoMouse.y para a sua lógica

  return (
    // Seu JSX do componente
  );
}
```

### `useKeyboard`

O hook `useKeyboard` escuta ações do teclado e executa uma função definida pelo usuário quando acionada.

#### Uso

```jsx
import { useKeyboard } from '@lymei/hooks';

function MeuComponente() {
  const handleKeyPress = (evento) => {
    // Sua lógica para lidar com o evento de pressionar tecla
  };

  useKeyboard(handleKeyPress);

  return (
    // Seu JSX do componente
  );
}
```

### `useToggle`

O hook `useToggle` retorna um state booliano e uma função para modificar o state com um valor especifico ou o oposto do atual.

#### Uso

```jsx
import { useToggle } from '@lymei/hooks';

function MeuComponente() {
	const [booliano, setBooliano] = useToggle(true); // Valor inicial

	return (
		<div>
			<p>{booliano}</p> {/*valor do state*/}
			<div>
				<button onClick{setBooliano}>Toggle</button> {/* alterna o valor do state */}
				<button onClick{() => setBooliano(true)}>True</button> {/* altera o valor do state para true */}
				<button onClick{() => setBooliano(false)}>False</button> {/* altera o valor do state para false */}
			</div>
		</div>
	);
}
```

### `useTimeout`

O `useTimeout` cria um temporizador que executa uma função após um determinado atraso. Ele também fornece funções para redefinir ou cancelar o temporizador.

#### Uso

```jsx
import { useTimeout } from 'seu-pacote-de-hooks-react';

function MeuComponente() {
  const minhaFuncao = () => {
    // Sua lógica a ser executada após o atraso
  };

  const delay = 1000; // 1 segundo de atraso

  const { reset, clear } = useTimeout(minhaFuncao, delay);

  // Use reset para redefinir o temporizador ou clear para cancelá-lo

  return (
    // Seu JSX do componente
  );
}
```

### `useDelay`

O `useDelay` é uma versão aprimorada do `useTimeout`, pois redefinirá o temporizador sempre que as dependências especificadas mudarem.

#### Uso

```jsx
import { useDelay } from 'seu-pacote-de-hooks-react';

function MeuComponente({ valor }) {
  const minhaFuncao = () => {
    // Sua lógica a ser executada após o atraso quando o valor mudar
  };

  const delay = 1000; // 1 segundo de atraso

  useDelay(minhaFuncao, delay, [valor]);

  return (
    // Seu JSX do componente
  );
}
```

### `useUpdateEffect`

O `useUpdateEffect` executa uma função a partir da primeira atualização de um valor nas dependências especificadas.

#### Uso

```jsx
import { useUpdateEffect } from 'seu-pacote-de-hooks-react';

function MeuComponente({ valor }) {
  const minhaFuncao = () => {
    // Sua lógica a ser executada após a primeira atualização de valor
  };

  useUpdateEffect(minhaFuncao, [valor]);

  return (
    // Seu JSX do componente
  );
}
```

### `useArray`

O `useArray` é uma forma mais fácil de criar e manipular um estado que é uma matriz.

#### Uso

```jsx
import { useArray } from 'seu-pacote-de-hooks-react';

function MeuComponente() {
  const [meuArray, arrayControl] = useArray();

  // Acesse meuArray para a sua lógica e use arrayControl para manipulá-lo

  return (
    // Seu JSX do componente
  );
}
```

#### Comandos

| Comandos |    Parâmetros    |                                  Função                                  |
| :------: | :--------------: | :----------------------------------------------------------------------: |
| `clear`  |      Nenhum      |                  Transforma a array em uma array vazia                   |
|  `push`  |     `value`      |          Adiciona um novo elemento (`value`) no final da array           |
| `remove` |     `index`      |             Remove um elemento da array utilizando o `index`             |
| `update` | `index`, `value` |     Atualiza um elemento na array pelo `index` por um novo (`value`)     |
| `filter` |     `filter`     | Modifica a array deixando apenas os elementos que passarem pelo `filter` |

## Instalação

Para instalar e usar este pacote, execute o seguinte comando no diretório do seu projeto:

```
npm install @lymei/hooks
```

## Autores

- [@imLymei](https://github.com/imLymei/)

## Licença

[MIT](https://choosealicense.com/licenses/mit/)

Sinta-se à vontade para utilizar esses custom hooks para otimizar o processo de desenvolvimento no React. Boa codificação!
