import { Delete } from '@mui/icons-material'
import { Button, Typography } from '@mui/joy'

import { productDelete } from '../../api/products'
import AlertDialogModal from '../../components/UI/AlertDialog'
import { showToast, ToastSeverity } from '../../components/UI/ToastMessageUtils'

interface DeleteBookDialogProps {
  productId: number
  onClose: () => void
  afterDelete: () => void
}

export function DeleteBookDialog({
  productId,
  onClose,
  afterDelete,
}: DeleteBookDialogProps) {
  const handleDelete = () => {
    productDelete(productId).then((res) => {
      if (res.data.code === '200') {
        showToast({
          title: '删除书籍',
          message: '书籍删除成功！',
          severity: ToastSeverity.Success,
          duration: 3000,
        })
        afterDelete()
      } else if (res.data.code === '400') {
        showToast({
          title: '删除失败',
          message: res.data.msg,
          severity: ToastSeverity.Danger,
          duration: 3000,
        })
      } else {
        showToast({
          title: '未知错误',
          message: '服务器出错！删除书籍失败，请重新尝试！',
          severity: ToastSeverity.Warning,
          duration: 3000,
        })
      }
    })
    onClose()
  }

  return (
    <AlertDialogModal
      title="删除书籍"
      open={true}
      onClose={onClose}
      icon={<Delete />}
      actions={
        <Button
          color="danger"
          variant="solid"
          onClick={handleDelete}
          startDecorator={<Delete />}
        >
          删除
        </Button>
      }
    >
      <Typography>您确定要删除这本书吗？</Typography>
    </AlertDialogModal>
  )
}

export default DeleteBookDialog
