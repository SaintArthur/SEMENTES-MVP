// CustomDrawer.js

import React from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    ScrollView, 
    TouchableOpacity, 
    Image, 
    Dimensions,
    Alert,
    SafeAreaView
} from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Assumindo que BottomTabNavigator, PlaceholderScreen, e o código de cores/dimensões virão do App.js
// Para isolamento, precisamos definir as constantes de estilo aqui:
const GREEN_DARK = "#27ae60";
const GREEN_MEDIUM = "#58d68d";
const { width } = Dimensions.get('window');
const ICON_SIZE = 24; // Mantendo o padrão

// --- Componente de Placeholder (Duplicado para funcionar neste arquivo) ---
// Em um projeto real, você exportaria e importaria este componente
const PlaceholderScreen = ({ route }) => (
    <View style={drawerStyles.screenPlaceholder}>
      <Text style={{fontSize: 20, fontWeight: 'bold'}}>{route.name}</Text>
      <Text>Em Construção</Text>
    </View>
);

// --- Dados do Menu ---
const DRAWER_ITEMS = [
    { label: "My Profile", icon: "account-outline", target: "Perfil" },
    { label: "Notifications", icon: "bell-outline", target: "NotificationsPlaceholder" },
    { label: "Settings", icon: "cog-outline", target: "SettingsPlaceholder" },
    { label: "About App", icon: "information-outline", target: "AboutPlaceholder" },
];

// --- Telas Placeholder adicionais para o Drawer (que não estão na Tab Bar) ---
const NotificationsPlaceholder = (props) => <PlaceholderScreen {...props} route={{name: "Notifications"}} />;
const SettingsPlaceholder = (props) => <PlaceholderScreen {...props} route={{name: "Settings"}} />;
const AboutPlaceholder = (props) => <PlaceholderScreen {...props} route={{name: "About App"}} />;


// --- Conteúdo Customizado do Drawer ---

function CustomDrawerContent(props) {
    const { navigation } = props;

    // Função para navegar para telas
    const navigateToScreen = (routeName) => {
        // Se a rota for uma das tabs existentes, navega dentro do TabNavigator
        if (routeName === "Perfil" || routeName === "Home" || routeName === "Startups" || routeName === "Comunidade" || routeName === "Eventos" || routeName === "LocalMarket") {
             // Navega para a tela TabNavigator (que é o BottomTabNavigator) e dentro dele, para a screen desejada
            navigation.navigate("TabNavigator", { screen: routeName });
        } else {
            // Navega para as telas exclusivas do Drawer (Placeholders)
            navigation.navigate(routeName);
        }
        
        navigation.closeDrawer();
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={drawerStyles.headerContainer}>
                {/* Ícone de Fechar (X) - MANTIDO NA DIREITA do Header, mas o Drawer abre da direita */}
                <TouchableOpacity onPress={() => navigation.closeDrawer()} style={drawerStyles.closeButton}>
                    <Feather name="x" size={30} color="#333" />
                </TouchableOpacity>

                {/* Área do Usuário */}
                <View style={drawerStyles.userProfile}>
                    <Text style={drawerStyles.headerVaerText}>Vaer</Text> {/* Adicionado "Vaer" */}
                    <Image
                        source={{ uri: 'https://i.ibb.co/L8B1t4p/user-avatar-arjun-das.jpg' }} // Imagem placeholder
                        style={drawerStyles.userAvatar}
                    />
                    <Text style={drawerStyles.userName}>Arjun Das</Text>
                    <View style={drawerStyles.userRoleBadge}>
                        <Text style={drawerStyles.userRoleText}>Admin</Text>
                    </View>
                </View>
            </View>
            
            <ScrollView contentContainerStyle={{ paddingTop: 20 }}>
                {DRAWER_ITEMS.map((item, index) => (
                    <TouchableOpacity 
                        key={index} 
                        style={drawerStyles.drawerItem}
                        onPress={() => navigateToScreen(item.target)}
                    >
                        <MaterialCommunityIcons name={item.icon} size={ICON_SIZE} color="#555" />
                        <Text style={drawerStyles.drawerItemLabel}>{item.label}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Logout separado por um divisor (implícito pelo estilo) */}
            <View style={drawerStyles.separator} /> 

            <TouchableOpacity 
                style={drawerStyles.logoutButton}
                onPress={() => Alert.alert('Logout', 'Implementar função de Logout.')}
            >
                <Feather name="log-out" size={ICON_SIZE} color="#74b9ff" />
                <Text style={drawerStyles.logoutText}>Logout</Text>
            </TouchableOpacity>

            <View style={drawerStyles.footerIllustration}>
                <MaterialCommunityIcons name="pine-tree-box" size={50} color={GREEN_MEDIUM} style={{ opacity: 0.6 }} />
                {/* Ajustado o posicionamento da árvore para a esquerda do drawer, já que o drawer agora abre na direita */}
                <MaterialCommunityIcons name="pine-tree-box" size={35} color={GREEN_DARK} style={{ position: 'absolute', bottom: 0, right: 10 }} /> 
            </View>
        </SafeAreaView>
    );
}

// --- Estilos do Drawer ---

const drawerStyles = StyleSheet.create({
    screenPlaceholder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    headerContainer: {
        paddingTop: 20,
        paddingHorizontal: 25,
        paddingBottom: 20,
        backgroundColor: 'white',
    },
    headerVaerText: { // Estilo para o texto "Vaer"
        fontSize: 24,
        fontWeight: 'bold',
        color: GREEN_DARK, 
        marginBottom: 20,
    },
    closeButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        padding: 5,
        zIndex: 10,
    },
    userProfile: {
        alignItems: 'flex-start',
    },
    userAvatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginBottom: 8,
        borderWidth: 2,
        borderColor: GREEN_DARK,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    userRoleBadge: {
        backgroundColor: '#74b9ff', 
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingVertical: 3,
    },
    userRoleText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '600',
    },
    drawerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 25,
    },
    drawerItemLabel: {
        marginLeft: 15,
        fontSize: 16,
        color: '#555',
        fontWeight: '500',
    },
    separator: {
        height: 1,
        backgroundColor: '#eee',
        marginHorizontal: 25,
        marginTop: 50,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 25,
        marginTop: 20, 
    },
    logoutText: {
        marginLeft: 15,
        fontSize: 16,
        color: '#74b9ff', 
        fontWeight: '500',
    },
    footerIllustration: {
        position: 'absolute',
        bottom: 0,
        // Alinhado à esquerda do Drawer (que agora abre na direita)
        left: 0, 
        padding: 10,
        opacity: 0.5,
    }
});


// --- Configuração do Drawer Principal ---

const Drawer = createDrawerNavigator();

// O AppDrawerNavigator recebe o BottomTabNavigator como prop (passado do App.js)
export default function AppDrawerNavigator({ BottomTabNavigator }) {
  return (
    <Drawer.Navigator
      initialRouteName="TabNavigator"
      screenOptions={{
          headerShown: false,
          drawerType: 'slide', 
          overlayColor: 'rgba(0, 0, 0, 0.6)',
          // >>> AQUI ESTÁ A MUDANÇA PRINCIPAL <<<
          drawerPosition: 'right', 
          drawerStyle: {
              width: width * 0.85, 
          }
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      {/* O BottomTabNavigator é a tela principal */}
      <Drawer.Screen 
          name="TabNavigator" 
          component={BottomTabNavigator} 
          options={{ swipeEnabled: false }} 
      />
      
      {/* Telas que estão acessíveis APENAS pelo Drawer */}
      <Drawer.Screen name="NotificationsPlaceholder" component={NotificationsPlaceholder} />
      <Drawer.Screen name="SettingsPlaceholder" component={SettingsPlaceholder} />
      <Drawer.Screen name="AboutPlaceholder" component={AboutPlaceholder} />
    </Drawer.Navigator>
  );
}