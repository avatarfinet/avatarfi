import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSubUserWallets } from '../../actions/adminActions'
import { postWallets, setUserWallets } from '../../actions/userActions'
import { copyToClipboard } from '../../utils/basicUtils'
import { DropdownBtn, TextBtn } from '../ui/Buttons'
import { InputPrep, Input, InputGroup } from '../ui/Inputs'

var uniqid = require('uniqid')

const toggleActive = {
  color: 'white',
  backgroundColor: '#65A3FF',
}

const Wallets = (props) => {
  const dispatch = useDispatch()
  const param = useSelector((state) => state.param)
  const user = useSelector((state) => state.user)
  const admin = useSelector((state) => state.admin)
  const [toggle, setToggle] = useState(true)

  let wallets = props.v === 'user' ? user.wallets : admin.subWallets
  let idR = props.v === 'user' ? user.raw._id : admin.subUser._id
  let setWalletsR = (x) =>
    props.v === 'user'
      ? dispatch(setUserWallets(x))
      : dispatch(setSubUserWallets(x))

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallets])

  const handleAddWallet = () => {
    wallets.unshift({
      uid: uniqid(),
      createdBy: user.raw._id,
      label: '',
      id: '',
    })
    setWalletsR(wallets)
  }

  const handleDellWallet = (x) => {
    let newWalletsState = wallets.filter((y) => y.uid !== x)
    setWalletsR(newWalletsState)
  }

  const onWalletInputChange = (e) => {
    setWalletsR(
      wallets.map((es) =>
        es.uid === e.target.id ? { ...es, [e.target.name]: e.target.value } : es
      )
    )
  }

  const mapWallets =
    wallets.lenght <= 0 || !param.isLoaded
      ? null
      : wallets.map((x, index) => {
          let createdBy = param.allUsers.filter((f) => f._id == x.createdBy)[0]
          return (
            <div className="dfc w-100" key={index}>
              <div className="pt-2 bb-0 b-i bra-1">
                <div className="df pb-2 jc-c">
                  {toggle ? null : (
                    <>
                      <TextBtn
                        variant="warning"
                        disabled={
                          createdBy._id !== user.raw._id && !user.admin.isSuper
                        }
                        onClick={() =>
                          window.confirm(
                            'Are you sure you want to delete this wallet?'
                          )
                            ? handleDellWallet(x.uid)
                            : null
                        }
                      >
                        Del
                      </TextBtn>
                      <p className="df ai-c ml-3">
                        Can be edited by:{' '}
                        {createdBy.name + ' ' + createdBy.surname}
                      </p>
                    </>
                  )}
                  {!toggle ? null : (
                    <>
                      <DropdownBtn
                        onSelect={null}
                        value="Explorers"
                        variant="clear"
                        size="sm"
                      >
                        <div
                          onClick={() =>
                            window.confirm('Open Etherscan?')
                              ? window.open(
                                  'https://etherscan.io/address/' + x.id
                                )
                              : null
                          }
                        >
                          Etherscan
                        </div>
                        <div
                          onClick={() =>
                            window.confirm('Open Avascan?')
                              ? window.open(
                                  'https://avascan.info/blockchain/x/address/' +
                                    x.id
                                )
                              : null
                          }
                        >
                          Avax-X
                        </div>
                        <div
                          onClick={() =>
                            window.confirm('Open Avax C Chain?')
                              ? window.open(
                                  'https://snowtrace.io/address/' + x.id
                                )
                              : null
                          }
                        >
                          Avax-C
                        </div>
                        <div
                          onClick={() =>
                            window.confirm('Open Polygonscan?')
                              ? window.open(
                                  'https://polygonscan.com/address/' + x.id
                                )
                              : null
                          }
                        >
                          Polygonscan
                        </div>
                        <div
                          onClick={() =>
                            window.confirm('Open Bscscan?')
                              ? window.open(
                                  'https://bscscan.com/address/' + x.id
                                )
                              : null
                          }
                        >
                          Bscscan
                        </div>
                      </DropdownBtn>
                      <DropdownBtn
                        className="ml-3"
                        onSelect={null}
                        value="Charts"
                        variant="clear"
                        size="sm"
                      >
                        <div
                          variant="clear"
                          onClick={() =>
                            window.confirm('Open Markr for Avax Chain info?')
                              ? window.open(
                                  'https://markr.io/#/wallet?address=' + x.id
                                )
                              : null
                          }
                        >
                          Markr (Avax)
                        </div>
                        <div
                          variant="clear"
                          onClick={() =>
                            window.confirm('Open Debank for All Chains info?')
                              ? window.open(
                                  'https://debank.com/profile/' + x.id
                                )
                              : null
                          }
                        >
                          Debank (All)
                        </div>
                        <div
                          variant="clear"
                          onClick={() =>
                            window.confirm('Open Zapper for All Chains info?')
                              ? window.open('https://zapper.fi/account/' + x.id)
                              : null
                          }
                        >
                          Zapper (All)
                        </div>
                      </DropdownBtn>
                      <TextBtn
                        variant="info"
                        className="ml-3"
                        onClick={() => copyToClipboard(x.uid + 'wallet')}
                      >
                        Copy
                      </TextBtn>
                    </>
                  )}
                </div>
                <InputGroup className="wallet-li w-100">
                  <InputPrep variant="pillL">Label:</InputPrep>
                  <Input
                    className="w-30"
                    disabled={createdBy._id !== user.raw._id || toggle}
                    variant="pillM"
                    value={x.label}
                    id={x.uid}
                    name="label"
                    onChange={onWalletInputChange}
                  />
                  <InputPrep variant="pillM">Wallet Id:</InputPrep>
                  <Input
                    disabled={createdBy._id !== user.raw._id || toggle}
                    variant="pillR"
                    value={x.id}
                    id={x.uid}
                    name="id"
                    onChange={onWalletInputChange}
                  />
                </InputGroup>
              </div>
              <textarea
                style={{ height: 0, opacity: 0 }}
                onChange={null}
                readOnly
                id={x.uid + 'wallet'}
                value={x.id}
              />
            </div>
          )
        })

  return (
    <div className="preview dfc bra-1 p-2 h-mc mbt-1">
      <div className="df w-100 ai-c jc-c pbt-3">
        <h5>Wallets</h5>
        {toggle ? null : (
          <>
            <TextBtn
              className="ml-3"
              variant="info"
              onClick={() =>
                window.confirm('Add a new wallet?') ? handleAddWallet() : null
              }
            >
              Add
            </TextBtn>
            <TextBtn
              className="ml-3"
              variant="warning"
              onClick={() =>
                window.confirm('Are you sure you want to edit your wallets?')
                  ? postWallets({ id: idR, wallets: wallets })
                  : null
              }
            >
              Save
            </TextBtn>
          </>
        )}
        <TextBtn
          className="ml-3"
          variant="info"
          style={!toggle ? toggleActive : null}
          onClick={() => setToggle(!toggle)}
        >
          {toggle ? 'View' : 'Edit'}
        </TextBtn>
      </div>
      <div className="w-100 dfc jc-se ai-c pb-2'">{mapWallets}</div>
    </div>
  )
}

export default Wallets
