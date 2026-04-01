// useState gerencia estados reativos (dados que mudam e atualizam a tela)
import React, { useState } from 'react';
// Componentes visuais nativos do React Native
import { View, Text, Image, FlatList, Modal, TouchableOpacity, StyleSheet, Button, ImageBackground } from 'react-native';

// Classe base (pai) — define os atributos comuns a qualquer corpo celeste
class CorpoCeleste {
  constructor(id, nome, tipo, imagem, texto) {
    this.id = id;
    this.nome = nome;
    this.tipo = tipo; 
    this.imagem = imagem;
    this.texto = texto;
  }
}

// Herança: Estrela herda de CorpoCeleste e adiciona "temperatura"
class Estrela extends CorpoCeleste {
  constructor(id, nome, temperatura, imagem, texto) {
    super(id, nome, 'Estrela', imagem, texto); // super() chama o construtor da classe pai
    this.temperatura = temperatura;
  }
}

// Herança: Planeta herda de CorpoCeleste e adiciona "dias" (período orbital)
class Planeta extends CorpoCeleste {
  constructor(id, nome, dias, imagem, texto) {
    super(id, nome, 'Planeta', imagem, texto);
    this.dias = dias;
  }
}

// Função que retorna o array com todos os corpos celestes e seus dados
const obterSistemaSolar = () => [
  new Estrela('0', 'Sol', '5.500 °C', 'https://images-assets.nasa.gov/image/PIA03149/PIA03149~small.jpg', 'A estrela central do Sistema Solar, responsável por manter tudo em órbita com sua gravidade.'),
  new Planeta('8', 'Netuno', '60.190 dias terrestres', 'https://images-assets.nasa.gov/image/PIA01492/PIA01492~small.jpg', 'O planeta mais distante do Sol, conhecido por seus ventos supersônicos.'),
  new Planeta('7', 'Urano', '30.687 dias terrestres', 'https://images-assets.nasa.gov/image/PIA18182/PIA18182~small.jpg', 'Um gigante de gelo que gira de lado em relação à sua órbita.'),
  new Planeta('6', 'Saturno', '10.759 dias terrestres', 'https://images-assets.nasa.gov/image/PIA11141/PIA11141~small.jpg', 'Famoso por seu complexo e belo sistema de anéis.'),
  new Planeta('5', 'Júpiter', '4.333 dias terrestres', 'https://images-assets.nasa.gov/image/PIA22946/PIA22946~small.jpg', 'O maior planeta do Sistema Solar, um gigante gasoso.'),
  new Planeta('4', 'Marte', '687 dias terrestres', 'https://images-assets.nasa.gov/image/PIA02653/PIA02653~small.jpg', 'O planeta vermelho, alvo de muitas missões de exploração.'),
  new Planeta('3', 'Terra', '365 dias terrestres', 'https://images-assets.nasa.gov/image/PIA18033/PIA18033~small.jpg', 'Nosso lar, o único planeta conhecido a abrigar vida.'),
  new Planeta('2', 'Vênus', '225 dias terrestres', 'https://images-assets.nasa.gov/image/PIA00271/PIA00271~small.jpg', 'Conhecido como a estrela d’alva, possui uma atmosfera densa e quente.'),
  new Planeta('1', 'Mercúrio', '88 dias terrestres', 'https://images-assets.nasa.gov/image/PIA15160/PIA15160~small.jpg', 'Planeta mais próximo do Sol e o menor do Sistema Solar.')
];

// Componente principal da aplicação
export default function App() {
  const [corposCelestes] = useState(obterSistemaSolar()); // Lista de planetas (estado imutável)
  const [itemSelecionado, setItemSelecionado] = useState(null); // Qual planeta foi clicado
  const [modalVisivel, setModalVisivel] = useState(false); // Controla se o modal está aberto

  // Ao clicar num planeta: salva qual foi clicado e abre o modal
  const abrirDetalhes = (item) => {
    setItemSelecionado(item);
    setModalVisivel(true);
  };

  // Renderiza cada cartão da lista (imagem circular + nome)
  const renderizarItem = ({ item }) => (
    <TouchableOpacity style={estilos.cartaoItem} onPress={() => abrirDetalhes(item)}>
      <View style={estilos.imagemWrapper}>
        <Image source={{ uri: item.imagem }} style={estilos.imagemReal} />
      </View>
      <Text style={estilos.textoNome}>{item.nome}</Text>
    </TouchableOpacity>
  );

  // GIF animado do espaço como fundo de toda a tela
  return (
    <ImageBackground 
      source={{ uri: 'https://usagif.com/wp-content/uploads/gif/outerspace-76.gif' }} 
      style={estilos.containerGeral}
    >
      <Text style={estilos.tituloCabecalho}>Explorador Espacial</Text>
      
      {/* FlatList: lista otimizada que exibe os itens em grid de 2 colunas */}
      <FlatList
        data={corposCelestes}
        keyExtractor={(item) => item.id}
        renderItem={renderizarItem}
        numColumns={2}
        contentContainerStyle={estilos.listaContainer}
        columnWrapperStyle={estilos.linhaLista} 
      />

      {/* Modal: tela sobreposta que aparece ao clicar num planeta */}
      <Modal visible={modalVisivel} animationType="slide" transparent={true}>
        <View style={estilos.modalFundo}>
          <View style={estilos.modalConteudo}>
            {itemSelecionado && (
              <>
                <Text style={estilos.modalTitulo}>{itemSelecionado.nome}</Text>
                <View style={estilos.imagemExpandidaWrapper}>
                  <Image source={{ uri: itemSelecionado.imagem }} style={estilos.imagemReal} />
                </View>
                
                {/* Polimorfismo: exibe "Órbita" se for Planeta, "Superfície" se for Estrela */}
                {itemSelecionado.tipo === 'Planeta' ? (
                  <Text style={estilos.modalDadoExtra}>Órbita: {itemSelecionado.dias}</Text>
                ) : (
                  <Text style={estilos.modalDadoExtra}>Superfície: {itemSelecionado.temperatura}</Text>
                )}

                <Text style={estilos.modalDescricao}>{itemSelecionado.texto}</Text>
                <View style={estilos.botaoFechar}>
                  <Button title="Voltar" onPress={() => setModalVisivel(false)} color="#333" />
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
}

// Estilos visuais de todos os componentes
const estilos = StyleSheet.create({
  containerGeral: { flex: 1, backgroundColor: '#000' }, 
  tituloCabecalho: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginTop: 40,
    marginBottom: 20, 
    color: '#FFF',
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10
  },
  listaContainer: { paddingHorizontal: 15, paddingBottom: 20 },
  linhaLista: { 
    justifyContent: 'center', 
    gap: 10 
  }, 
  cartaoItem: { 
    width: 145, 
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginVertical: 10, 
    alignItems: 'center', 
    justifyContent: 'center', 
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.45)', 
    borderWidth: 1.5,
    borderColor: 'rgba(0, 0, 0, 0.8)', 
    elevation: 5, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.5, 
    shadowRadius: 5 
  },
  imagemWrapper: { 
    width: 110, 
    height: 110, 
    borderRadius: 55, 
    overflow: 'hidden',
    marginBottom: 10 
  },
  imagemReal: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  textoNome: { 
    fontSize: 16, 
    fontWeight: '700', 
    color: '#FFF', 
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3
  },
  modalFundo: { flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'center', alignItems: 'center' },
  modalConteudo: { 
    width: '90%', 
    backgroundColor: '#FFF', 
    borderRadius: 18, 
    padding: 15, 
    alignItems: 'center', 
    elevation: 20 
  },
  modalTitulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 2, color: '#222' },
  imagemExpandidaWrapper: { 
    width: 100, 
    height: 100, 
    borderRadius: 50, 
    marginVertical: 10,
    overflow: 'hidden'
  },
  modalDadoExtra: { fontSize: 14, fontWeight: 'bold', color: '#0056b3', marginBottom: 6 },
  modalDescricao: { fontSize: 14, textAlign: 'center', color: '#444', lineHeight: 20, marginBottom: 12 },
  botaoFechar: { width: '100%', borderRadius: 8, overflow: 'hidden', marginTop: 2 }
});