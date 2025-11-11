import React, { useState, useRef } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    ScrollView, 
    TouchableOpacity, 
    Image, 
    Dimensions,
    FlatList,
    Alert,
    Platform 
} from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import Svg, { Path } from 'react-native-svg';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { 
    createDrawerNavigator, 
    DrawerContentScrollView, 
    DrawerItemList,
    DrawerItem 
} from '@react-navigation/drawer';
// CORREÇÃO CRÍTICA: Importação do useSafeAreaInsets
import { useSafeAreaInsets } from 'react-native-safe-area-context'; 

// --- Constantes Globais ---
const LOGO_URL = "https://i.ibb.co/7JyNcW0r/marca-sementes-horizontal-branco-2x-2.png";
const GREEN_DARK = "#27ae60";
const GREEN_MEDIUM = "#58d68d";
const TEXT_COLOR = '#929292';
const ICON_SIZE = 24;
const { width } = Dimensions.get('window');

// Dimensões do Carrossel 
const CAROUSEL_PADDING_HORIZONTAL = 25; 
const CAROUSEL_CONTAINER_WIDTH = width; 
const CAROUSEL_ITEM_WIDTH = width; 
const CAROUSEL_HEIGHT = 180; 

// --- Dados de Exemplo do Carrossel ---
const CAROUSEL_DATA = [
    { id: '1', title: "Notícias Urgentes da Comunidade", subtitle: "Fique por dentro dos avisos mais recentes e importantes.", image: 'https://via.placeholder.com/300x200/58d68d/ffffff?text=Slide+1' },
    { id: '2', title: "Descubra Novos Projetos!", subtitle: "Veja as últimas iniciativas lançadas na sua vila.", image: 'https://via.placeholder.com/300x200/74b9ff/ffffff?text=Slide+2' },
    { id: '3', title: "Sua Voz Importa", subtitle: "Use a Caixa de Sugestões para melhorar o seu bairro.", image: 'https://via.placeholder.com/300x200/f8cb22/ffffff?text=Slide+3' },
];

// Dados para os módulos na Home Screen
const MODULE_DATA = [
    { title: "Projects", icon: "briefcase", color: "#f8cb22" },
    { title: "Complaint box", icon: "archive-alert", color: "#b980f0" },
    { title: "Blood bank", icon: "blood-bag", color: "#f78fb3" },
    { title: "Videos", icon: "play-circle-outline", color: "#54a0ff" },
    { title: "Idea Box", icon: "lightbulb-on-outline", color: "#53e56a" },
    { title: "Gallery", icon: "image-multiple-outline", color: "#ff8c77" },
    { title: "News and Events", icon: "newspaper-variant-outline", color: "#929292" },
    { title: "Events", icon: "calendar-star", color: "#ff6347" }, 
    { title: "Feedback and Suggestion", icon: "comment-text-multiple-outline", color: "#74b9ff" },
];

// --- 1. Componente Hexágono Customizado (Para o Tab Central) ---

const HEX_SIZE = 35; 
const HEX_COLOR = '#52B76C'; 

const getHexagonPath = (size) => {
    const h = size / 2;
    const w = (Math.sqrt(3) / 2) * size;
    
    const path = `
        M ${h} 0
        L ${size} ${w / 2}
        L ${size} ${w * 1.5}
        L ${h} ${w * 2}
        L 0 ${w * 1.5}
        L 0 ${w / 2}
        Z
    `;
    return path;
};

const HEX_HEIGHT = (Math.sqrt(3) / 2) * HEX_SIZE * 2;

function HexagonButton({ children, onPress, accessibilityState, focused, ...props }) {
    return (
        <TouchableOpacity
            {...props} 
            onPress={onPress}
            style={hexagonStyles.touchable}
        >
            <View style={hexagonStyles.svgContainer}>
                <Svg height={HEX_HEIGHT} width={HEX_SIZE} viewBox={`0 0 ${HEX_SIZE} ${HEX_HEIGHT}`}>
                    <Path
                        d={getHexagonPath(HEX_SIZE)}
                        fill={HEX_COLOR}
                    />
                </Svg>
                <View style={hexagonStyles.iconWrapper}>
                    <Ionicons name="home-outline" size={ICON_SIZE} color={'white'} />
                </View>
            </View>
        </TouchableOpacity>
    );
}

const hexagonStyles = StyleSheet.create({
    touchable: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 70, 
    },
    svgContainer: {
        width: HEX_SIZE, 
        height: HEX_HEIGHT, 
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -15, 
    },
    iconWrapper: {
        position: 'absolute',
        top: HEX_HEIGHT / 2 - (ICON_SIZE / 2), 
        left: HEX_SIZE / 2 - (ICON_SIZE / 2),
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        fontSize: 10,
        fontWeight: '500',
        color: TEXT_COLOR,
        marginTop: -5, 
    }
});

// --- 2. Componente da Tela Principal (Home) ---

const ModuleButton = ({ title, icon, color }) => (
    <TouchableOpacity 
        style={homeStyles.moduleButton} 
        onPress={() => Alert.alert('Navegação', `Navegando para: ${title}`)}
    >
        <View style={[homeStyles.moduleIconBox, { backgroundColor: color }]}>
            <MaterialCommunityIcons name={icon} size={30} color="white" />
        </View>
        <Text style={homeStyles.moduleText}>{title}</Text>
    </TouchableOpacity>
);

const renderCarouselItem = ({ item }) => (
    <View style={homeStyles.slideWrapper}>
        <View style={homeStyles.slide}>
            <Image
                source={{ uri: item.image }}
                style={homeStyles.slideImage}
                resizeMode="cover"
            />
            <View style={homeStyles.slideTextContainer}>
                <Text style={homeStyles.slideTitle}>{item.title}</Text>
                <Text style={homeStyles.slideSubtitle}>{item.subtitle}</Text>
            </View>
        </View>
    </View>
);

function HomeScreen() {
    const navigation = useNavigation(); 
    const [activeIndex, setActiveIndex] = useState(0); 
    const carouselRef = useRef(null);

    const onViewableItemsChanged = useRef(({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setActiveIndex(viewableItems[0].index !== undefined ? viewableItems[0].index : 0);
        }
    }).current;

    const viewabilityConfig = {
        itemVisiblePercentThreshold: 50,
    };

    const renderModules = () => {
        return MODULE_DATA.map((item, index) => (
            <ModuleButton key={index} {...item} />
        ));
    };

    const renderPagination = () => (
        <View style={homeStyles.paginationContainer}>
            {CAROUSEL_DATA.map((_, index) => (
                <View
                    key={index}
                    style={[
                        homeStyles.dot,
                        activeIndex === index ? homeStyles.dotActive : homeStyles.dotInactive,
                    ]}
                />
            ))}
        </View>
    );

    return (
        <View style={homeStyles.container}>
            {/* Header Customizado */}
            <View style={homeStyles.header}>
                <Image
                    source={{ uri: LOGO_URL }}
                    style={homeStyles.logoImage} 
                    resizeMode="contain"
                />

                <View style={homeStyles.headerRight}>
                    <TouchableOpacity style={homeStyles.headerButton}>
                        <Ionicons name="notifications-outline" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[homeStyles.headerButton, homeStyles.menuButton]} 
                        // Abre o Drawer
                        onPress={() => navigation.openDrawer()} 
                    >
                        <Feather name="menu" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Resto do conteúdo da HomeScreen */}
            <View style={homeStyles.carouselContainer}>
                <FlatList
                    ref={carouselRef}
                    data={CAROUSEL_DATA}
                    renderItem={renderCarouselItem}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled 
                    snapToInterval={CAROUSEL_ITEM_WIDTH}
                    decelerationRate="fast"
                    onViewableItemsChanged={onViewableItemsChanged}
                    viewabilityConfig={viewabilityConfig}
                    style={homeStyles.carousel}
                />
                
                {renderPagination()}
            </View>

            <View style={homeStyles.contentCard}>
                <ScrollView contentContainerStyle={homeStyles.scrollContent}>
                    <Text style={homeStyles.categoriesTitle}>Categories</Text> 
                    <View style={homeStyles.modulesGrid}>
                        {renderModules()}
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

const homeStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: GREEN_DARK, 
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 25, 
        paddingTop: Platform.OS === 'android' ? 25 : 50, 
        paddingBottom: 20,
    },
    logoImage: {
        width: 180, 
        height: 100, 
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerButton: {
        padding: 8,
        backgroundColor: 'white',
        borderRadius: 10,
        marginLeft: 10,
    },
    carouselContainer: {
        backgroundColor: GREEN_DARK, 
        width: CAROUSEL_CONTAINER_WIDTH, 
        paddingBottom: 15, 
        marginBottom: 20, 
    },
    carousel: {
        height: CAROUSEL_HEIGHT + 20,
        width: '100%',
    },
    slideWrapper: {
        width: CAROUSEL_ITEM_WIDTH,
        paddingHorizontal: 25,
    },
    slide: {
        width: '100%',
        height: CAROUSEL_HEIGHT,
        borderRadius: 15,
        overflow: 'hidden',
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    slideImage: {
        ...StyleSheet.absoluteFillObject,
        opacity: 0.8,
    },
    slideTextContainer: {
        paddingHorizontal: 20, 
        paddingVertical: 15,
        justifyContent: 'flex-end',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    slideTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    slideSubtitle: {
        fontSize: 16,
        color: 'white',
        marginTop: 5,
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 4,
    },
    dotActive: {
        backgroundColor: 'white',
    },
    dotInactive: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    contentCard: {
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingTop: 20,
        paddingHorizontal: 25, 
    },
    scrollContent: {
        paddingBottom: 30, 
    },
    categoriesTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#333',
        marginBottom: 20,
        marginTop: 10,
    },
    modulesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    moduleButton: {
        width: '30%', 
        marginBottom: 15,
        alignItems: 'center',
    },
    moduleIconBox: {
        width: 70,
        height: 70,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    moduleText: {
        fontSize: 12,
        fontWeight: '500',
        textAlign: 'center',
        color: '#555',
        marginTop: 5,
    },
});

// --- 3. Telas de Placeholder e Navegação ---
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator(); 

const PlaceholderScreen = ({ route }) => (
    <View style={navStyles.screenPlaceholder}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>{route.name}</Text>
        <Text>Em Construção</Text>
    </View>
);

function BottomTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: navStyles.tabBar,
                tabBarActiveTintColor: GREEN_DARK,
                tabBarInactiveTintColor: TEXT_COLOR,
                tabBarShowLabel: (route.name !== 'Home'), 
            })}
        >
            <Tab.Screen
                name="Startups"
                component={PlaceholderScreen}
                options={{
                    tabBarLabel: ({ color }) => (<Text style={[navStyles.tabLabel, { color }]}>Startups</Text>), 
                    tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="finance" size={ICON_SIZE} color={color} />),
                }}
            />
            <Tab.Screen
                name="Comunidade"
                component={PlaceholderScreen}
                options={{
                    tabBarLabel: ({ color }) => (<Text style={[navStyles.tabLabel, { color }]}>Comunidade</Text>),
                    tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="pencil-box-multiple-outline" size={ICON_SIZE} color={color} />),
                }}
            />
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarButton: (props) => (<HexagonButton {...props} />),
                }}
            />
            <Tab.Screen
                name="Eventos"
                component={PlaceholderScreen}
                options={{
                    tabBarLabel: ({ color }) => (<Text style={[navStyles.tabLabel, { color }]}>Eventos</Text>),
                    tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="calendar" size={ICON_SIZE} color={color} />),
                }}
            />
            <Tab.Screen
                name="Perfil"
                component={PlaceholderScreen}
                options={{
                    tabBarLabel: ({ color }) => (<Text style={[navStyles.tabLabel, { color }]}>Perfil</Text>),
                    tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="account-group-outline" size={ICON_SIZE} color={color} />),
                }}
            />
        </Tab.Navigator>
    );
}

// --- 4. Componente de Conteúdo Customizado do Drawer (Estilizado e com Safe Area) ---

function CustomDrawerContent(props) {
    const navigation = useNavigation();
    // NOVO: Pega os valores seguros de espaçamento
    const insets = useSafeAreaInsets(); 

    const DRAWER_ITEMS_TOP = [
        { label: 'My Profile', icon: 'person-outline', screen: 'Perfil' },
        { label: 'Notifications', icon: 'notifications-outline', screen: 'Notifications' },
        { label: 'Settings', icon: 'settings-outline', screen: 'Settings' },
    ];
    const DRAWER_ITEMS_BOTTOM = [
        { label: 'About App', icon: 'information-circle-outline', screen: 'About' },
        { label: 'Logout', icon: 'log-out-outline', screen: 'Logout' },
    ];

    const renderDrawerItem = (item) => (
        <DrawerItem
            key={item.label}
            label={item.label}
            icon={({ color, size }) => (
                <Ionicons name={item.icon} color={color} size={size} />
            )}
            onPress={() => {
                // Tenta navegar ou apenas mostra um alerta se a tela não existir
                if (item.screen && props.state.routeNames.includes(item.screen)) {
                    navigation.navigate(item.screen);
                } else {
                    Alert.alert('Navegação', `Navegando para: ${item.label}`);
                }
            }}
            inactiveTintColor={'#555'}
            activeTintColor={GREEN_DARK}
            labelStyle={drawerStyles.drawerItemLabel}
            style={drawerStyles.drawerItem}
        />
    );

    return (
        <DrawerContentScrollView {...props} contentContainerStyle={drawerStyles.scrollViewContent}>
            
            {/* Cabeçalho Customizado (com Safe Area) */}
            <View style={[drawerStyles.headerContainer, { paddingTop: insets.top + 10 }]}>
                {/* Botão de Fechar no topo direito do Drawer (com Safe Area) */}
                <TouchableOpacity 
                    style={[drawerStyles.closeButton, { top: insets.top + 10 }]}
                    // FUNÇÃO DE FECHAR O DRAWER
                    onPress={() => navigation.closeDrawer()}
                >
                    <Ionicons name="close" size={30} color="#333" />
                </TouchableOpacity>

                {/* Info do Perfil */}
                <View style={drawerStyles.profileInfo}>
                    <Image
                        source={{ uri: 'https://i.ibb.co/hV72qYx/arjun-das.jpg' }}
                        style={drawerStyles.profileImage}
                    />
                    <View>
                        <View style={drawerStyles.nameRow}>
                            <Text style={drawerStyles.profileName}>Arjun Das</Text>
                            <View style={drawerStyles.adminBadge}>
                                <Text style={drawerStyles.adminText}>Admin</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>

            {/* Itens do Topo (My Profile, Notifications, Settings) */}
            <View style={drawerStyles.section}>
                {DRAWER_ITEMS_TOP.map(renderDrawerItem)}
            </View>

            {/* Separador */}
            <View style={drawerStyles.separator} />

            {/* Itens de Baixo (About App, Logout) */}
            <View style={drawerStyles.section}>
                {DRAWER_ITEMS_BOTTOM.map(renderDrawerItem)}
            </View>

            {/* Imagem de Fundo (Árvores) (com Safe Area) */}
            <View style={[drawerStyles.footerImageContainer, { paddingBottom: insets.bottom + 10 }]}>
                <Image
                    source={{ uri: 'https://i.ibb.co/68v0wXw/arvores-drawer.png' }}
                    style={drawerStyles.footerImage}
                    resizeMode="contain"
                />
            </View>
        </DrawerContentScrollView>
    );
}

const drawerStyles = StyleSheet.create({
    scrollViewContent: {
        paddingTop: 0,
        backgroundColor: '#fff',
        flex: 1, 
    },
    headerContainer: {
        padding: 20,
        paddingBottom: 25,
        // O paddingTop é adicionado dinamicamente com insets.top no componente
    },
    closeButton: {
        position: 'absolute',
        // O top é adicionado dinamicamente com insets.top no componente
        right: 10,
        padding: 10,
        zIndex: 1,
    },
    profileInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 15,
        borderWidth: 2,
        borderColor: '#eee', 
    },
    nameRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileName: {
        color: '#333',
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 10,
    },
    adminBadge: {
        backgroundColor: '#c4d6ff',
        borderRadius: 15,
        paddingHorizontal: 8,
        paddingVertical: 3,
    },
    adminText: {
        color: '#3f51b5',
        fontSize: 12,
        fontWeight: 'bold',
    },
    section: {
        paddingHorizontal: 10,
    },
    separator: {
        height: 1,
        backgroundColor: '#f0f0f0',
        marginVertical: 10,
        marginHorizontal: 20,
    },
    drawerItem: {
        marginHorizontal: 0,
        borderRadius: 0,
        paddingHorizontal: 10,
    },
    drawerItemLabel: {
        fontWeight: '600',
        fontSize: 15,
    },
    footerImageContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'flex-end',
        paddingRight: 10,
        // O paddingBottom é adicionado dinamicamente com insets.bottom no componente
    },
    footerImage: {
        width: 100, 
        height: 100,
    },
});
//-----------------------------------------------------------------------------------------------------------//

// --- 5. Criação do Main Drawer Navigator (Ajustado para a Direita) ---

function MainDrawerNavigator() {
    return (
        <Drawer.Navigator
            initialRouteName="MainTabs"
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                headerShown: false,
                drawerPosition: 'right', 
                drawerActiveTintColor: GREEN_DARK, 
                drawerInactiveTintColor: TEXT_COLOR, 
                drawerLabelStyle: { fontWeight: '600' },
                drawerStyle: {
                    width: width * 0.85, 
                },
            }}
        >
            <Drawer.Screen 
                name="MainTabs" 
                component={BottomTabNavigator} 
                options={{ 
                    drawerItemStyle: { display: 'none' } 
                }}
            />
            <Drawer.Screen 
                name="Notifications" 
                component={PlaceholderScreen} 
                options={{ drawerItemStyle: { display: 'none' } }}
            />
             <Drawer.Screen 
                name="Settings" 
                component={PlaceholderScreen} 
                options={{ drawerItemStyle: { display: 'none' } }}
            />
             <Drawer.Screen 
                name="About" 
                component={PlaceholderScreen} 
                options={{ drawerItemStyle: { display: 'none' } }}
            />
        </Drawer.Navigator>
    );
}

const navStyles = StyleSheet.create({
    screenPlaceholder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    tabBar: {
        height: 70, 
        backgroundColor: 'white',
        borderTopWidth: 0,
        position: 'absolute',
        bottom: 0,
        paddingBottom: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 10,
    },
    tabLabel: {
        fontSize: 10,
        marginTop: 2,
        fontWeight: '500',
    },
});

// --- 6. Exportando o App Principal ---

export default function App() {
    return (
        <NavigationContainer>
            <MainDrawerNavigator />
        </NavigationContainer>
    );
}