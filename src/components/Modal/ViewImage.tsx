import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  return(
    <Modal isOpen={isOpen} onClose={onClose} isCentered >
      <ModalOverlay />
      <ModalContent bgColor="pGray.900"
        w="auto"
        h="auto"
        maxW={['900px']}
        maxH={['600px']}
      >
        <ModalBody justifyContent="center" display="flex">
          <Image src={imgUrl} 
            w="100%" 
            h="auto"
            maxW={['900px']}
            maxH={['600px']}
           />
        </ModalBody>
        <ModalFooter>
          <Link href={imgUrl} target="_blank">
            Abrir original 
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
