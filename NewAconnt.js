import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image,
  Dimensions,
} from "react-native";

import { Ionicons, FontAwesome, AntDesign } from "@expo/vector-icons";
// O Picker não está sendo usado no formulário. Se for necessário, descomente a linha abaixo.
// import { Picker } from "@react-native-picker/picker";

const LOGO_URL = "https://programasementes.com.br/wp-content/uploads/2025/06/marca_sementes_horizontal_negativo@2x-1.png";
const GREEN_DARK = "#27ae60"; 
const GREEN_MEDIUM = "#58d68d";
const WHITE = "#fff";
const { width } = Dimensions.get('window');

// --- Componente principal ---
export default function CadastroScreen() {
  // --- Estados do Formulário ---
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [place, setPlace] = useState("Selecione um local"); 
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  // --- Funções de Lógica ---

  /**
   * Formata uma string para o padrão de CNPJ (00.000.000/0000-00).
   * @param {string} value - O valor do CNPJ.
   * @returns {string} O valor formatado.
   */
  const formatCNPJ = (value) => {
    let v = value.replace(/\D/g, ""); 
    v = v.replace(/^(\d{2})(\d)/, "$1.$2");
    v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
    v = v.replace(/\.(\d{3})(\d)/, ".$1/$2");
    v = v.replace(/(\d{4})(\d)/, "$1-$2");
    return v.substring(0, 18);
  };

  /**
   * Lida com a submissão do formulário de criação de conta.
   */
  const handleCreateAccount = () => {
    if (password !== confirmPassword) {
      Alert.alert("Erro de Senha", "As senhas digitadas não coincidem! Por favor, verifique.");
      return;
    }
    
    if (!name || !email || !phone || !cnpj || !password) {
        Alert.alert("Erro de Preenchimento", "Por favor, preencha todos os campos obrigatórios.");
        return;
    }

    Alert.alert("Sucesso no Cadastro", `Conta criada com sucesso para ${name}!`);
  };

  // --- Renderização ---
  return (
    <View style={styles.container}>
      {/* Círculos de Background - Efeito Decorativo */}
      <View style={styles.topCirclesContainer}> 
        <View style={[styles.circleBase, { backgroundColor: GREEN_DARK, left: -width * 0.15, top: -150, width: width * 0.5, height: width * 0.6 }]} />
        <View style={[styles.circleBase, { backgroundColor: GREEN_DARK, right: -width * 0.10, top: -150, width: width * 0.4, height: width * 0.6 }]} />
        <View style={[styles.circleBase, styles.centralCircle, { backgroundColor: GREEN_MEDIUM, left: width * 0.15, top: -180, width: width * 0.7, height: width * 0.7 }]} />
      </View>

      {/* Wrapper de Conteúdo com Scroll e Keyboard Avoiding */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.contentWrapper}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -200} 
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Image
              source={{ uri: LOGO_URL }}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>
          
          {/* Formulário de Cadastro */}
          <View style={styles.form}>
            <Text style={styles.title}>Criar conta</Text>

            {/* Nome */}
            <Text style={styles.label}>Nome</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome completo"
              placeholderTextColor="#bdbdbd"
              value={name}
              onChangeText={setName}
            />

            {/* Email */}
            <Text style={styles.label}>E-mail</Text>
            <TextInput
              style={styles.input}
              placeholder="user@mail.com"
              placeholderTextColor="#bdbdbd"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />

            {/* Contato (Telefone) */}
            <Text style={styles.label}>Contato</Text>
            <View style={styles.phoneBox}>
              <Text style={styles.phonePrefix}>+91</Text>
              <TextInput
                style={styles.phoneInput}
                placeholder="99887 76655"
                placeholderTextColor="#bdbdbd"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
                maxLength={12} 
              />
            </View>

            {/* CNPJ */}
            <Text style={styles.label}>CNPJ</Text>
            <TextInput
              style={styles.input}
              placeholder="00.000.000/0000-00"
              placeholderTextColor="#bdbdbd"
              keyboardType="numeric"
              value={cnpj}
              onChangeText={(text) => setCnpj(formatCNPJ(text))} 
            />


            {/* Senha */}
            <Text style={styles.label}>Senha</Text>
            <View style={styles.inputIconBox}>
              {/* O estilo 'inputPassword' ajusta o TextInput para não ocupar todo o espaço */}
              <TextInput
                style={styles.inputPassword} 
                placeholder="Digite sua senha"
                placeholderTextColor="#bdbdbd"
                secureTextEntry={!passwordVisible}
                value={password}
                onChangeText={setPassword}
                // Adicione estas propriedades para iOS para controlar a sugestão de senha forte
                textContentType="newPassword" 
                autoComplete="new-password"
                importantForAutofill="yes"
              />
              <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} style={styles.eyeIcon}>
                <Ionicons
                  name={passwordVisible ? "eye-off" : "eye"}
                  size={22}
                  color="#555"
                />
              </TouchableOpacity>
            </View>

            {/* Confirmar Senha */}
            <Text style={styles.label}>Confirmar senha</Text>
            <View style={styles.inputIconBox}>
              {/* O estilo 'inputPassword' ajusta o TextInput para não ocupar todo o espaço */}
              <TextInput
                style={styles.inputPassword}
                placeholder="Confirme sua senha"
                placeholderTextColor="#bdbdbd"
                secureTextEntry={!confirmPasswordVisible}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                // Adicione estas propriedades para iOS para controlar a sugestão de senha forte
                textContentType="newPassword"
                autoComplete="new-password"
                importantForAutofill="yes"
              />
              <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)} style={styles.eyeIcon}>
                <Ionicons
                  name={confirmPasswordVisible ? "eye-off" : "eye"}
                  size={22}
                  color="#555"
                />
              </TouchableOpacity>
            </View>

            {/* Botão Criar Conta */}
            <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
              <Text style={styles.buttonText}>Criar Agora</Text>
            </TouchableOpacity>

            {/* Divisor "Criar com" */}
            <View style={styles.dividerBox}>
              <View style={styles.line} />
              <Text style={styles.dividerText}>Criar com</Text>
              <View style={styles.line} />
            </View>

            {/* Botões de Mídia Social */}
            <View style={styles.socialBox}>
              <TouchableOpacity style={[styles.socialButtonBase, styles.socialButtonFacebook]}>
                <FontAwesome name="facebook" size={22} color="#1877F2" />
                <Text style={styles.socialTextFacebook}>Facebook</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.socialButtonBase, styles.socialButtonGmail]}>
                <AntDesign name="google" size={22} color="#DB4437" />
                <Text style={styles.socialTextGmail}>Gmail</Text>
              </TouchableOpacity>
            </View>

            {/* Link para Login */}
            <View style={styles.footerContainer}>
              <Text style={styles.footerText}>Já tem uma conta?</Text>
              <TouchableOpacity>
                 <Text style={styles.loginNow}> Entrar agora</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

// --- Estilos ---
const styles = StyleSheet.create({
  // Base
  container: { flex: 1, backgroundColor: WHITE },
  contentWrapper: { flex: 1, zIndex: 1 },
  scrollContent: { paddingBottom: 40 },

  // Círculos de Background
  topCirclesContainer: { 
    position: "absolute", 
    top: 0, 
    width: "100%", 
    height: 200, 
    zIndex: 10, 
    pointerEvents: "none" 
  },
  circleBase: { 
    position: "absolute", 
    borderRadius: 999 
  },
  centralCircle: { 
    zIndex: 10 
  },

  // Logo
  logoContainer: { 
    marginTop: 90, 
    marginBottom: 5, 
    alignItems: "center", 
    width: "100%", 
    paddingHorizontal: 25 
  },
  logoImage: { 
    marginTop: 20, 
    width: width * 0.7, 
    height: 100 
  },

  // Formulário
  form: { 
    paddingHorizontal: 25, 
    paddingTop: 50 
  },
  title: { 
    fontSize: 24, 
    fontWeight: "800", 
    marginBottom: 30, 
    color: "#333" 
  },
  label: { 
    fontSize: 14, 
    marginBottom: 4, 
    color: "#333", 
    fontWeight: "600" 
  },
  
  // Campos de Input Padrão
  input: { 
    height: 48, 
    borderWidth: 1, 
    borderColor: "#dcdcdc", 
    borderRadius: 8, 
    paddingHorizontal: 15, 
    marginBottom: 16, 
    backgroundColor: "#fff", 
    fontSize: 16 
  },

  // Input de Telefone
  phoneBox: { 
    flexDirection: "row", 
    alignItems: "center", 
    borderWidth: 1, 
    borderColor: "#dcdcdc", 
    borderRadius: 8, 
    backgroundColor: "#fff", 
    height: 48, 
    marginBottom: 16 
  },
  phonePrefix: { 
    paddingHorizontal: 15, 
    fontSize: 16, 
    color: "#333", 
    borderRightWidth: 1, 
    borderRightColor: "#dcdcdc", 
    alignSelf: "stretch", 
    textAlignVertical: "center", 
    lineHeight: Platform.OS === "ios" ? 48 : undefined, 
    fontWeight: "500" 
  },
  phoneInput: { 
    flex: 1, 
    height: "100%", 
    paddingLeft: 10, 
    fontSize: 16 
  },

  // Input de Senha com Ícone - ESTILOS AJUSTADOS AQUI!
  inputIconBox: { 
    flexDirection: "row", 
    alignItems: "center", 
    borderWidth: 1, 
    borderColor: "#dcdcdc", 
    borderRadius: 8, 
    backgroundColor: "#fff", 
    height: 48, 
    // Removido paddingHorizontal daqui, será adicionado nos elementos internos
    marginBottom: 16 
  },
  inputPassword: { // Novo estilo para o TextInput dentro de inputIconBox
    flex: 1, // Permite que o TextInput ocupe o espaço disponível
    height: "100%", 
    paddingHorizontal: 15, // Adicionado padding horizontal aqui
    fontSize: 16,
    // Garante que o texto comece e termine corretamente
    paddingVertical: 0, 
  },
  eyeIcon: {
    // Adicione padding para o ícone, garantindo que ele não cole na borda
    paddingRight: 15, 
    paddingLeft: 10, // Adiciona um pequeno espaço entre o input e o ícone
  },


  // Botão de Submissão
  button: { 
    backgroundColor: GREEN_DARK, 
    height: 50, 
    borderRadius: 8, 
    justifyContent: "center", 
    alignItems: "center", 
    marginTop: 25, 
    shadowColor: GREEN_DARK, 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: { 
    color: WHITE, 
    fontWeight: "800", 
    fontSize: 17 
  },

  // Divisor
  dividerBox: { 
    flexDirection: "row", 
    alignItems: "center", 
    marginVertical: 35 
  },
  line: { 
    flex: 1, 
    height: 1, 
    backgroundColor: "#e0e0e0" 
  },
  dividerText: { 
    marginHorizontal: 15, 
    color: "#777", 
    fontSize: 14, 
    fontWeight: "500" 
  },

  // Botões Sociais
  socialBox: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    marginBottom: 25 
  },
  socialButtonBase: {
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "center", 
    borderWidth: 1, 
    paddingVertical: 10, 
    borderRadius: 8, 
    backgroundColor: "#fff", 
    height: 48, 
    borderColor: "#dcdcdc",
  },
  socialButtonFacebook: { 
    flex: 1, 
    marginRight: 10 
  },
  socialButtonGmail: { 
    flex: 1, 
    marginLeft: 10 
  },
  socialTextFacebook: { 
    marginLeft: 10, 
    fontSize: 15, 
    color: "#1877F2", 
    fontWeight: "600" 
  },
  socialTextGmail: { 
    marginLeft: 10, 
    fontSize: 15, 
    color: "#DB4437", 
    fontWeight: "600" 
  },

  // Rodapé
  footerContainer: { 
    flexDirection: "row", 
    justifyContent: "center", 
    alignItems: "center", 
    marginTop: 15 
  },
  footerText: { 
    textAlign: "center", 
    color: "#777", 
    fontSize: 15 
  },
  loginNow: { 
    color: GREEN_DARK, 
    fontWeight: "700", 
    fontSize: 15 
  },
});