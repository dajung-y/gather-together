export const variantStyles = {
  mainOpen: {
    isDisabled: false,
    canDelete: false,
    canEnter: false,
    isTagDisabled: false,
    isToggleDisabled: true,
  },
  mainClosed: {
    isDisabled: true,
    canDelete: false,
    canEnter: false,
    isTagDisabled: false,
    isToggleDisabled: true,
  },
  memberOpen: {
    isDisabled: false,
    canDelete: false,
    canEnter: true,
    isTagDisabled: true,
    isToggleDisabled: true,
  },
  memberClosed: {
    isDisabled: true,
    canDelete: true,
    canEnter: false,
    isTagDisabled: true,
    isToggleDisabled: true,
  },
  leaderOpen: {
    isDisabled: false,
    canDelete: false,
    canEnter: true,
    isTagDisabled: true,
    isToggleDisabled: false,
  },
  leaderClosed: {
    isDisabled: false,
    canDelete: false,
    canEnter: true,
    isTagDisabled: true,
    isToggleDisabled: false,
  }
}
