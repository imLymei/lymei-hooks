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
