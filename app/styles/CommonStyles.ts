// styles/CommonStyles.ts
import { StyleSheet } from 'react-native'

const CommonStyles = StyleSheet.create({
  // Общие отступы для ScrollView / контейнеров
  containerPadding: {
    paddingVertical: 24,
    paddingHorizontal: 16,
  },

  // Заголовки секций / карточек
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },

  // Текстовые стили
  labelText: {
    fontSize: 14,
    color: '#667085',
    fontWeight: '500',
  },
  smallText: {
    fontSize: 14,
    color: '#666',
  },
  itemLabel: {
    fontSize: 16,
  },

  // Карточка
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E6EAF2',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },

  // Поля ввода (используется в EditProfileScreen)
  input: {
    borderWidth: 1,
    borderColor: '#D0D5DD',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#F8FAFC',
  },

  // Кнопки и контейнер действий
  actions: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonBase: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPrimary: {
    backgroundColor: '#007AFF',
  },
  buttonPrimaryText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  buttonSecondary: {
    borderWidth: 1,
    borderColor: '#007AFF',
    backgroundColor: '#fff',
  },
  buttonSecondaryText: {
    color: '#007AFF',
    fontWeight: '600',
    fontSize: 16,
  },

  // Элементы списка
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
})

export default CommonStyles
