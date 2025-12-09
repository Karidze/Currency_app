import { StyleSheet } from 'react-native'

const CommonStyles = StyleSheet.create({
  containerPadding: {
    paddingVertical: 24,
    paddingHorizontal: 20, // чуть больше горизонтальный отступ
  },

  sectionTitle: {
    fontSize: 18, // увеличили
    fontWeight: "600",
    color: '#007AFF',
    marginBottom: 8,
  },

  labelText: {
    fontSize: 15,
    color: '#667085',
    fontWeight: "500",
  },
  smallText: {
    fontSize: 14,
    color: '#666',
  },
  itemLabel: {
    fontSize: 18, // увеличили шрифт для пунктов меню
    fontWeight: "500",
    color: '#111',
  },

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

  input: {
    borderWidth: 1,
    borderColor: '#D0D5DD',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 16,
    backgroundColor: '#F8FAFC',
  },

  actions: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  buttonBase: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPrimary: {
    backgroundColor: '#007AFF',
  },
  buttonPrimaryText: {
    color: '#fff',
    fontWeight: "600",
    fontSize: 16,
  },
  buttonSecondary: {
    borderWidth: 1,
    borderColor: '#007AFF',
    backgroundColor: '#fff',
  },
  buttonSecondaryText: {
    color: '#007AFF',
    fontWeight: "600",
    fontSize: 16,
  },

  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16, // увеличили отступ
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14, // чуть больше расстояние между иконкой и текстом
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    width: '85%',
    gap: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: '#007AFF',
    marginBottom: 8,
  },
  modalText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  closeBtn: {
    marginTop: 12,
    alignSelf: 'flex-end',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#007AFF',
    borderRadius: 8,
  },
  closeText: {
    color: '#fff',
    fontWeight: "600",
  },
})

export default CommonStyles
