// Exemple pris de la documentation officiel afin de tester la création de plugins

export default () => {
    id: 'toaster';
    init: ( deck ) => {
      deck.addKeyBinding( { keyCode: 84, key: 'T' }, () => {
        deck.shuffle();
        console.log('🍻, les chats sont cute');
      } );
    }
  }