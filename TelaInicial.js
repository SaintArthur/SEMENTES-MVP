import React from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";

const { width } = Dimensions.get('window');

// --- Definições de Cores ---
const GREEN_DARK = "#27ae60"; 
const GREEN_MEDIUM = "#58d68d";
const WHITE = "#fff";

// URL da imagem do logo fornecida pelo usuário
const LOGO_URL = "https://programasementes.com.br/wp-content/uploads/2025/06/marca_sementes_horizontal_negativo@2x-1.png";

// Componente para a Árvore Estilizada (Não será mais usado, mas mantido caso queira)
const Tree = ({ color, height }) => (
    <View style={[styles.tree, { height, backgroundColor: color }]} />
);

// --- Componente Principal (Top e Rodapé com Círculos) ---

export default function App() {
  return (
    <View style={styles.container}>
      
      {/* 1. Topo Verde (Três Círculos por cima da parte branca) */}
      <View style={styles.topCirclesContainer}> 
          {/* Círculo esquerdo (mais escuro) */}
          <View style={[styles.circleBase, { backgroundColor: GREEN_DARK, left: -width * 0.15, top: -10, width: width * 0.6, height: width * 0.6 }]} />
          {/* Círculo direito (mais escuro) */}
          <View style={[styles.circleBase, { backgroundColor: GREEN_DARK, right: -width * 0.15, top: -10, width: width * 0.6, height: width * 0.6 }]} />
          {/* Círculo central (mais claro e por cima) */}
          <View style={[styles.circleBase, styles.centralCircle, { backgroundColor: GREEN_MEDIUM, left: width * 0.25, top: -30, width: width * 0.7, height: width * 0.7 }]} />
      </View>

      {/* 2. Logo (Posicionado com Margem Topo) */}
      <View style={styles.logoContainer}>
          <Image 
              source={{ uri: LOGO_URL }}
              style={styles.logoImage}
              resizeMode="contain"
          />
      </View>

      {/* 3. Rodapé com Círculos (AGORA IGUAL AO TOPO) */}
      <View style={styles.bottomCirclesContainer}>
          {/* Círculo esquerdo (mais escuro) */}
          <View style={[styles.circleBase, { backgroundColor: GREEN_DARK, left: -width * 0.15, bottom: -10, width: width * 0.6, height: width * 0.6 }]} />
          {/* Círculo direito (mais escuro) */}
          <View style={[styles.circleBase, { backgroundColor: GREEN_DARK, right: -width * 0.15, bottom: -10, width: width * 0.6, height: width * 0.6 }]} />
          {/* Círculo central (mais claro e por cima) */}
          <View style={[styles.circleBase, styles.centralCircle, { backgroundColor: GREEN_MEDIUM, left: width * 0.25, bottom: -30, width: width * 0.7, height: width * 0.7 }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    alignItems: "center",
    justifyContent: "space-between", 
  },
  
  // --- Estilização Base para Círculos (topo e rodapé) ---
  circleBase: { // Novo estilo base para os círculos
    position: "absolute",
    borderRadius: 999, // Transforma em um círculo completo
  },
  centralCircle: {
    zIndex: 10, 
  },

  // --- Estilização do Topo Verde (Círculos) ---
  topCirclesContainer: { 
    position: "absolute",
    top: -150,
    width: "100%",
    height: 150, 
    // overflow: "hidden", // Remova se quiser que os círculos maiores se estendam para fora
  },
  
  // --- Estilização do Logo ---
  logoContainer: {
    marginTop: "60%",
    display:'flex',
    marginTop:'100%'
  },
  logoImage: {
    width: width * 1.5, 
    height: 65,
    
  },
  
  // --- Estilização do Rodapé com Círculos ---
  bottomCirclesContainer: { // Novo container para os círculos inferiores
    position: "absolute", // Posiciona absolutamente para não interferir no flexbox do container
    bottom: -150,
    width: "100%",
    height: 150, // Mesma altura do topo
    // overflow: "hidden", // Remova se quiser que os círculos maiores se estendam para fora
  },

});