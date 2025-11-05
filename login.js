import React, { useState } from "react";
import { 
    View, 
    Text, 
    StyleSheet, 
    Dimensions, 
    TextInput, 
    TouchableOpacity,
    Image,
    KeyboardAvoidingView, // Para evitar que o teclado cubra os inputs
    Platform
} from "react-native";

// URL da logo
const LOGO_URL = "https://programasementes.com.br/wp-content/uploads/2025/06/marca_sementes_horizontal_negativo@2x-1.png";

// URLs dos Ícones de Login Social (Usando PNGs de fontes confiáveis para compatibilidade com React Native)
// CORRIGIDO: URL do Facebook alterada para um link PNG direto e estável (Wikimedia Commons),
// pois os links anteriores eram de páginas web e não dos arquivos de imagem diretos.
const FACEBOOK_ICON_URL = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/100px-Facebook_f_logo_%282019%29.svg.png";
const GMAIL_ICON_URL = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/512px-Gmail_icon_%282020%29.svg.png";

const { width } = Dimensions.get('window');

// --- Definições de Cores ---
const PRIMARY_GREEN = "#4CAF50"; // Verde principal para botões e links
const GREEN_DARK = "#27ae60"; 
const GREEN_MEDIUM = "#58d68d";
const TEXT_GRAY = "#666";
const BORDER_COLOR = "#ccc";
const WHITE = "#fff";
const BLACK = "#000";

// --- Componente Principal (Tela de Login Híbrida) ---

export default function App() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Removido 'alert()' conforme as instruções de boas práticas
  const handleLogin = () => { console.log("Login Feito!"); };
  const handleFacebookLogin = () => { console.log("Login com Facebook!"); };
  const handleGmailLogin = () => { console.log("Login com Gmail!"); };
  const handleForgotPassword = () => { console.log("Esqueceu a senha?"); };
  const handleCreateAccount = () => { console.log("Criar Nova Conta!"); };

  return (
    <View style={styles.container}>

      {/* 1. Topo Verde (Círculos) - POSIÇÃO ABSOLUTA */}
      <View style={styles.topCirclesContainer}> 
          {/* Círculo esquerdo (mais escuro) */}
          <View style={[styles.circleBase, { backgroundColor: GREEN_DARK, left: -width * 0.15, top: -30, width: width * 0.5, height: width * 0.6 }]} />
          {/* Círculo direito (mais escuro) */}
          <View style={[styles.circleBase, { backgroundColor: GREEN_DARK, right: -width * 0.15, top: -30, width: width * 0.4, height: width * 0.6 }]} />
          {/* Círculo central (mais claro e por cima) */}
          <View style={[styles.circleBase, styles.centralCircle, { backgroundColor: GREEN_MEDIUM, left: width * 0.15, top: -60, width: width * 0.7, height: width * 0.7 }]} />
      </View>

      {/* 2. Conteúdo Principal (Logo e Formulário) - Z-INDEX ALTO */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.contentWrapper}
      >
        <View style={styles.formOuterContainer}>
            
            {/* LOGO DO SEMENTES */}
            <View style={styles.logoContainer}>
                <Image
                    source={{ uri: LOGO_URL }}
                    style={styles.logoImage}
                    resizeMode="contain"
                />
            </View>

            {/* --- Seção de Formulário de Login --- */}
            <View style={styles.formContainer}>
                
                {/* Campo de Usuário/Email */}
                <Text style={styles.label}>Login:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="CNPJ ou E-mail"
                    placeholderTextColor={TEXT_GRAY}
                    value={userName}
                    onChangeText={setUserName}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                {/* Campo de Senha com Ícone */}
                <View style={styles.passwordContainer}>
                    <Text style={styles.label}>Senha:</Text>
                    <TouchableOpacity onPress={handleForgotPassword}>
                        <Text style={styles.forgotPassword}>Esqueceu a senha?</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.inputWithIcon}>
                    <TextInput
                        style={styles.passwordInput}
                        placeholder="Digite sua senha"
                        placeholderTextColor={TEXT_GRAY}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity 
                        style={styles.eyeIcon} 
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <Text style={{ fontSize: 20 }}>{showPassword ? '👁️' : '🔒'}</Text> 
                    </TouchableOpacity>
                </View>

                {/* Botão ENTRAR */}
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.loginButtonText}>ENTRAR</Text>
                </TouchableOpacity>

                {/* Divisor "Entrar com" */}
                <View style={styles.dividerContainer}>
                    <View style={styles.dividerLine} />
                    <Text style={styles.dividerText}>Entrar com</Text>
                    <View style={styles.dividerLine} />
                </View>

                {/* Botões de Login Social */}
                <View style={styles.socialButtonsContainer}>
                    <TouchableOpacity style={styles.socialButton} onPress={handleFacebookLogin}>
                        {/* Ícone do Facebook atualizado com a URL direta e estável */}
                        <Image 
                            source={{ uri: FACEBOOK_ICON_URL }} 
                            style={styles.socialIcon} 
                            resizeMode="contain" 
                        />
                        <Text style={styles.socialButtonText}>Facebook</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialButton} onPress={handleGmailLogin}>
                        {/* Ícone do Gmail/Google atualizado com Image */}
                        <Image 
                            source={{ uri: GMAIL_ICON_URL }} 
                            style={styles.socialIcon} 
                            resizeMode="contain" 
                        />
                        <Text style={styles.socialButtonText}>Gmail</Text>
                    </TouchableOpacity>
                </View>

            </View> {/* Fim do formContainer */}

            {/* --- Seção Ainda não tem uma conta? --- */}
            <View style={styles.createAccountContainer}>
                <Text style={styles.createAccountText}>Ainda não tem uma conta?</Text>
                <TouchableOpacity onPress={handleCreateAccount}>
                    <Text style={styles.createAccountLink}>Criar nova conta</Text>
                </TouchableOpacity>
            </View>
        </View>
      </KeyboardAvoidingView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    paddingHorizontal: 20,
  },
  
  // --- Estilização dos Círculos no Topo ---
  topCirclesContainer: { 
    position: "absolute",
    top: -120,
    width: "100%",
    height: 200,
    display: "flex",
    
  },
  circleBase: {
    position: "absolute",
    borderRadius: 999,
  },
  centralCircle: {
    zIndex: 10,
  },

  // --- Wrapper para o Conteúdo (para controle de fluxo e z-index) ---
  contentWrapper: {
    flex: 1,
    zIndex: 20, 
  },
  formOuterContainer: {
    flex: 1,
    justifyContent: "space-between",
  },

  // --- Estilos da Logo ---
  logoContainer: {
    // Mantém o espaçamento que o título 'Login' tinha
    marginTop: 90, 
    marginBottom: 5,
    alignItems: 'center', // Centraliza a logo horizontalmente
    width: '100%',
  },
  logoImage: {
    marginTop: 20,
    width: width * 0.7, // Largura relativa para a logo
    height: 100, // Altura fixa suficiente
  },

  // --- Estilos do Formulário ---
  formContainer: {
    width: '100%',
    alignItems: 'flex-start',
  },
  label: {
    fontSize: 16,
    color: BLACK,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 15,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: BLACK,
    backgroundColor: WHITE,
  },
  passwordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 15,
    marginBottom: 8,
  },
  forgotPassword: {
    color: PRIMARY_GREEN,
    fontSize: 14,
    fontWeight: '500',
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: WHITE,
  },
  passwordInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 15,
    fontSize: 16,
    color: BLACK,
  },
  eyeIcon: {
    paddingHorizontal: 15,
    height: 50,
    justifyContent: 'center',
  },
  loginButton: {
    width: '100%',
    backgroundColor: PRIMARY_GREEN,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
  },
  loginButtonText: {
    color: WHITE,
    fontSize: 18,
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 30,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: BORDER_COLOR,
  },
  dividerText: {
    marginHorizontal: 10,
    color: TEXT_GRAY,
    fontSize: 14,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    // Sem margem inferior para que o link de criar conta fique bem no final
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
    height: 50,
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: WHITE,
  },
  socialButtonText: {
    fontSize: 16,
    color: TEXT_GRAY,
    fontWeight: '500',
  },
  // NOVO ESTILO PARA OS ÍCONES DE IMAGEM
  socialIcon: {
    width: 24, 
    height: 24,
    marginRight: 8,
  },
  createAccountContainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20, // Garante algum espaço entre os botões sociais e este link
  },
  createAccountText: {
    color: TEXT_GRAY,
    fontSize: 14,
  },
  createAccountLink: {
    color: PRIMARY_GREEN,
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
});