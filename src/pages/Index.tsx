import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

type Screen = 'home' | 'search' | 'trips' | 'details' | 'profile';

const PhoneFrame = ({ 
  platform, 
  children, 
  currentScreen, 
  setCurrentScreen 
}: { 
  platform: 'ios' | 'android'; 
  children: React.ReactNode;
  currentScreen: Screen;
  setCurrentScreen: (screen: Screen) => void;
}) => {
  return (
    <div className="relative">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-heading font-bold mb-1">
          {platform === 'ios' ? 'iOS' : 'Android'}
        </h2>
        <p className="text-sm text-muted-foreground">
          {platform === 'ios' ? 'Human Interface Guidelines' : 'Material Design'}
        </p>
      </div>
      
      <div className={`max-w-sm mx-auto bg-white min-h-[700px] relative shadow-2xl ${
        platform === 'ios' ? 'rounded-[3rem]' : 'rounded-3xl'
      } overflow-hidden`}>
        <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 ${
          platform === 'ios' 
            ? 'w-40 h-7 bg-black rounded-b-3xl' 
            : 'w-32 h-6 bg-black rounded-b-2xl'
        } z-50`}></div>
        
        <div className="h-full overflow-auto pb-20">
          {children}
        </div>

        <div
          className={`absolute bottom-0 left-0 right-0 bg-white border-t ${
            platform === 'ios' ? 'pb-6 pt-2' : 'py-3'
          }`}
        >
          <div className="flex justify-around items-center px-4">
            {[
              { icon: 'Home', label: 'Главная', screen: 'home' as Screen },
              { icon: 'Search', label: 'Поиск', screen: 'search' as Screen },
              { icon: 'Briefcase', label: 'Поездки', screen: 'trips' as Screen },
              { icon: 'User', label: 'Профиль', screen: 'profile' as Screen },
            ].map((item) => (
              <button
                key={item.screen}
                onClick={() => setCurrentScreen(item.screen)}
                className={`flex flex-col items-center gap-1 transition-all ${
                  currentScreen === item.screen
                    ? 'text-primary scale-105'
                    : 'text-muted-foreground'
                } ${platform === 'ios' ? 'py-2' : 'py-3'}`}
              >
                <Icon
                  name={item.icon as any}
                  size={platform === 'ios' ? 24 : 26}
                />
                <span className={`text-xs ${platform === 'ios' ? 'font-medium' : 'font-normal'}`}>
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Index = () => {
  const [iosScreen, setIosScreen] = useState<Screen>('home');
  const [androidScreen, setAndroidScreen] = useState<Screen>('home');

  const destinations = [
    {
      id: 1,
      name: 'Токио',
      country: 'Япония',
      price: '₽85,000',
      duration: '7 дней',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop',
      rating: 4.9,
    },
    {
      id: 2,
      name: 'Париж',
      country: 'Франция',
      price: '₽65,000',
      duration: '5 дней',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop',
      rating: 4.8,
    },
    {
      id: 3,
      name: 'Бали',
      country: 'Индонезия',
      price: '₽45,000',
      duration: '10 дней',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&h=300&fit=crop',
      rating: 4.7,
    },
  ];

  const myTrips = [
    { id: 1, name: 'Барселона', date: '15-22 дек', status: 'Забронировано' },
    { id: 2, name: 'Стамбул', date: '10-17 янв', status: 'Оплачено' },
  ];

  const renderContent = (platform: 'ios' | 'android', currentScreen: Screen, setCurrentScreen: (screen: Screen) => void) => {
    if (currentScreen === 'home') {
      return (
        <div className="p-6 animate-fade-in pt-12">
          <div className="mb-6">
            <h2 className="text-3xl font-heading font-bold mb-2">
              Найди свою <br />
              следующую поездку
            </h2>
            <p className="text-muted-foreground">
              Тысячи направлений ждут тебя
            </p>
          </div>

          <div className="relative mb-6">
            <Icon name="Search" className="absolute left-3 top-3 text-muted-foreground" size={20} />
            <Input
              placeholder="Куда хочешь поехать?"
              className={`pl-10 ${
                platform === 'ios'
                  ? 'rounded-xl bg-gray-100 border-0 h-11'
                  : 'rounded-lg h-12'
              }`}
              onClick={() => setCurrentScreen('search')}
            />
          </div>

          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            <Button
              className={`${
                platform === 'ios'
                  ? 'rounded-full bg-blue-500 hover:bg-blue-600 text-white'
                  : 'rounded-lg bg-blue-600 hover:bg-blue-700 text-white'
              } whitespace-nowrap`}
            >
              <Icon name="Sparkles" size={16} className="mr-1" />
              Популярное
            </Button>
            <Button
              variant="outline"
              className={`${
                platform === 'ios' ? 'rounded-full' : 'rounded-lg'
              } whitespace-nowrap`}
            >
              🏖️ Пляжи
            </Button>
            <Button
              variant="outline"
              className={`${
                platform === 'ios' ? 'rounded-full' : 'rounded-lg'
              } whitespace-nowrap`}
            >
              🏔️ Горы
            </Button>
            <Button
              variant="outline"
              className={`${
                platform === 'ios' ? 'rounded-full' : 'rounded-lg'
              } whitespace-nowrap`}
            >
              🏛️ Культура
            </Button>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Лучшие направления</h3>
            {destinations.map((dest, index) => (
              <Card
                key={dest.id}
                className={`overflow-hidden cursor-pointer transition-all hover:scale-[1.02] ${
                  platform === 'ios'
                    ? 'rounded-2xl shadow-md'
                    : 'rounded-xl shadow-lg'
                }`}
                onClick={() => setCurrentScreen('details')}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2">
                    <Icon name="Heart" size={18} className="text-red-500" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <div className="flex items-center gap-1 text-white mb-1">
                      <Icon name="Star" size={14} fill="currentColor" />
                      <span className="text-sm font-medium">{dest.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-lg">{dest.name}</h4>
                      <p className="text-sm text-muted-foreground">{dest.country}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg text-blue-600">
                        {dest.price}
                      </p>
                      <p className="text-xs text-muted-foreground">{dest.duration}</p>
                    </div>
                  </div>
                  <Button
                    className={`w-full bg-blue-600 hover:bg-blue-700 text-white ${
                      platform === 'ios'
                        ? 'rounded-full'
                        : 'rounded-lg'
                    }`}
                  >
                    <Icon name="Plane" size={16} className="mr-2" />
                    Забронировать
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      );
    }

    if (currentScreen === 'search') {
      return (
        <div className="p-6 animate-fade-in pt-12">
          <Button
            variant="ghost"
            onClick={() => setCurrentScreen('home')}
            className={`mb-4 ${platform === 'ios' ? 'rounded-full' : 'rounded-lg'}`}
          >
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Назад
          </Button>

          <h2 className="text-2xl font-heading font-bold mb-4">Поиск поездок</h2>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Откуда</label>
              <Input
                placeholder="Москва"
                className={`${
                  platform === 'ios'
                    ? 'rounded-xl bg-gray-100 border-0 h-11'
                    : 'rounded-lg h-12'
                }`}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Куда</label>
              <Input
                placeholder="Выбери направление"
                className={`${
                  platform === 'ios'
                    ? 'rounded-xl bg-gray-100 border-0 h-11'
                    : 'rounded-lg h-12'
                }`}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Дата отъезда</label>
                <Input
                  type="date"
                  className={`${
                    platform === 'ios'
                      ? 'rounded-xl bg-gray-100 border-0 h-11'
                      : 'rounded-lg h-12'
                  }`}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Дата возврата</label>
                <Input
                  type="date"
                  className={`${
                    platform === 'ios'
                      ? 'rounded-xl bg-gray-100 border-0 h-11'
                      : 'rounded-lg h-12'
                  }`}
                />
              </div>
            </div>

            <Button
              className={`w-full h-12 bg-purple-600 hover:bg-purple-700 text-white ${
                platform === 'ios'
                  ? 'rounded-full'
                  : 'rounded-lg'
              }`}
            >
              <Icon name="Search" size={20} className="mr-2" />
              Найти поездки
            </Button>
          </div>
        </div>
      );
    }

    if (currentScreen === 'trips') {
      return (
        <div className="p-6 animate-fade-in pt-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-heading font-bold">Мои поездки</h2>
            <Button
              size="sm"
              className={`bg-purple-600 hover:bg-purple-700 text-white ${
                platform === 'ios'
                  ? 'rounded-full'
                  : 'rounded-lg'
              }`}
            >
              <Icon name="Plus" size={16} />
            </Button>
          </div>

          <div className="space-y-4">
            {myTrips.map((trip) => (
              <Card
                key={trip.id}
                className={`p-4 cursor-pointer hover:scale-[1.02] transition-all ${
                  platform === 'ios' ? 'rounded-2xl shadow-md' : 'rounded-xl shadow-lg'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-lg mb-1">{trip.name}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{trip.date}</p>
                    <Badge className="bg-green-600 text-white border-0 hover:bg-green-700">
                      {trip.status}
                    </Badge>
                  </div>
                  <Icon name="ChevronRight" className="text-muted-foreground" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      );
    }

    if (currentScreen === 'details') {
      return (
        <div className="animate-fade-in">
          <div className="relative h-80">
            <img
              src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop"
              alt="Токио"
              className="w-full h-full object-cover"
            />
            <Button
              variant="ghost"
              onClick={() => setCurrentScreen('home')}
              className={`absolute top-4 left-4 bg-white/90 backdrop-blur-sm ${
                platform === 'ios' ? 'rounded-full' : 'rounded-lg'
              }`}
            >
              <Icon name="ArrowLeft" size={20} />
            </Button>
            <Button
              variant="ghost"
              className={`absolute top-4 right-4 bg-white/90 backdrop-blur-sm ${
                platform === 'ios' ? 'rounded-full' : 'rounded-lg'
              }`}
            >
              <Icon name="Heart" size={20} className="text-red-500" />
            </Button>
          </div>

          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-3xl font-heading font-bold mb-2">Токио</h2>
                <p className="text-muted-foreground">Япония • 7 дней</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-blue-600">
                  ₽85,000
                </p>
                <p className="text-sm text-muted-foreground">на человека</p>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-1">
                <Icon name="Star" size={18} fill="currentColor" className="text-yellow-500" />
                <span className="font-semibold">4.9</span>
              </div>
              <span className="text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">1,234 отзыва</span>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-purple-100">
                  <Icon name="MapPin" size={20} className="text-purple-600" />
                </div>
                <div>
                  <p className="font-medium">Включено</p>
                  <p className="text-sm text-muted-foreground">
                    Отель, перелет, трансферы
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-blue-100">
                  <Icon name="Calendar" size={20} className="text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Гибкая отмена</p>
                  <p className="text-sm text-muted-foreground">
                    Бесплатная отмена до 14 дней
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className={`${
                  platform === 'ios' ? 'rounded-full h-12' : 'rounded-lg h-12'
                }`}
              >
                <Icon name="MessageCircle" size={18} className="mr-2" />
                Вопрос
              </Button>
              <Button
                className={`bg-orange-600 hover:bg-orange-700 text-white ${
                  platform === 'ios'
                    ? 'rounded-full h-12'
                    : 'rounded-lg h-12'
                }`}
              >
                <Icon name="ShoppingCart" size={18} className="mr-2" />
                Купить
              </Button>
            </div>
          </div>
        </div>
      );
    }

    if (currentScreen === 'profile') {
      return (
        <div className="p-6 animate-fade-in pt-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 rounded-full bg-purple-600 flex items-center justify-center text-white text-2xl font-bold">
              АИ
            </div>
            <div>
              <h2 className="text-xl font-semibold">Анна Иванова</h2>
              <p className="text-sm text-muted-foreground">anna@example.com</p>
            </div>
          </div>

          <div className="space-y-2">
            {[
              { icon: 'User', label: 'Личные данные' },
              { icon: 'CreditCard', label: 'Способы оплаты' },
              { icon: 'Bell', label: 'Уведомления' },
              { icon: 'Settings', label: 'Настройки' },
            ].map((item) => (
              <Card
                key={item.label}
                className={`p-4 cursor-pointer hover:scale-[1.01] transition-all ${
                  platform === 'ios' ? 'rounded-xl shadow-md' : 'rounded-lg shadow-lg'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon name={item.icon as any} size={20} className="text-muted-foreground" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-7xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-heading font-bold mb-3">
          iOS vs Android Design
        </h1>
        <p className="text-lg text-muted-foreground">
          Сравни два подхода к дизайну мобильных приложений
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
        <PhoneFrame 
          platform="ios" 
          currentScreen={iosScreen} 
          setCurrentScreen={setIosScreen}
        >
          {renderContent('ios', iosScreen, setIosScreen)}
        </PhoneFrame>

        <PhoneFrame 
          platform="android" 
          currentScreen={androidScreen} 
          setCurrentScreen={setAndroidScreen}
        >
          {renderContent('android', androidScreen, setAndroidScreen)}
        </PhoneFrame>
      </div>
    </div>
  );
};

export default Index;
