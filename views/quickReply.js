const { toRedirectGaUrl } = require('../libs/helpers')

exports.shareForm = ({ label, cd, ec, ea, el }) => ([{
  type: 'action',
  action: {
    uri: toRedirectGaUrl({
      u: 'https://lihi1.cc/q7zVh',
      cd,
      ec,
      ea,
      el,
    }),
    type: 'uri',
    label,
  },
}])
