// styles/EditProfileStyles.ts
import { StyleSheet } from 'react-native'

const EditProfileStyles = StyleSheet.create({
  scroll: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    gap: 16,
  },

  // Header row with back arrow
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  backButton: {
    position: 'absolute',
    left: 0,
    padding: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#007AFF',
    textAlign: 'center',
  },

  // Поля формы
  field: {
    gap: 6,
  },

  // Gender pills (селектор пола)
  pillsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  pill: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#D0D5DD',
    backgroundColor: '#fff',
  },
  pillActive: {
    borderColor: '#007AFF',
    backgroundColor: '#E6F0FF',
  },
  pillText: {
    fontSize: 14,
    color: '#667085',
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  pillTextActive: {
    color: '#007AFF',
  },
})

export default EditProfileStyles
