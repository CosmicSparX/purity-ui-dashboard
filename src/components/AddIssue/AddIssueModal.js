import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Flex, // Added for layout
  Tag, // Added for document display
  TagLabel, // Added for document display
  TagCloseButton, // Added for document removal
  Tooltip, // Added for hover effect
  IconButton, // Import IconButton
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  useToast,
} from "@chakra-ui/react";

import { FiPlus } from "react-icons/fi";
import { FaFilePdf, FaFileImage, FaFileAlt } from "react-icons/fa"; // Import file type icons

function AddIssueModal({ isOpen, onClose, onAddIssue, defaultProjectId }) {
  const [issueName, setIssueName] = useState("");
  const [description, setDescription] = useState("");
  const [project, setProject] = useState(defaultProjectId || "");
  const [status] = useState("Open");
  const [priority, setPriority] = useState("Medium");
  const [expectedBehavior, setExpectedBehavior] = useState("");
  const [actualBehavior, setActualBehavior] = useState("");
  const [attachedDocuments, setAttachedDocuments] = useState([]); // Change to array for multiple files
  const toast = useToast();

  const handleSubmit = () => {
    if (!issueName || !description || !project) {
      toast({
        title: "Missing Information",
        description:
          "Please fill in all required fields (Issue Name, Description, Project).",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const newIssue = {
      id: Date.now(), // Simple unique ID for demonstration
      name: issueName,
      description,
      project,
      status,
      priority,
      expectedBehavior,
      actualBehavior,
      attachedDocuments: attachedDocuments.map((file) => file.name), // Store file names for demonstration
      comments: [],
    };

    onAddIssue(newIssue);
    toast({
      title: "Issue Added",
      description: "The new issue has been successfully added.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    onClose();
    // Reset form fields
    setIssueName("");
    setDescription("");
    setProject("");
    setPriority("Medium");
    setExpectedBehavior("");
    setActualBehavior("");
    setAttachedDocuments([]);
  };

  const handleRemoveDocument = (indexToRemove) => {
    setAttachedDocuments(
      attachedDocuments.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Issue</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4} isRequired>
            <FormLabel>Issue Name</FormLabel>
            <Input
              placeholder="Enter issue name"
              value={issueName}
              onChange={(e) => setIssueName(e.target.value)}
            />
          </FormControl>

          <FormControl mb={4} isRequired>
            <FormLabel>Description</FormLabel>
            <Textarea
              placeholder="Enter issue description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormControl>

          <FormControl mb={4} isRequired>
            <FormLabel>Project</FormLabel>
            <Input // Changed to Project ID
              placeholder="Enter project ID"
              value={project}
              onChange={(e) => setProject(e.target.value)} // Allow manual entry if no default
              isReadOnly={!!defaultProjectId} // Make read-only if defaultProjectId is provided
            />
          </FormControl>

          <FormControl mb={4} isRequired>
            <FormLabel>Priority</FormLabel>
            <Select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </Select>
          </FormControl>

          <FormControl mb={4} isRequired>
            <FormLabel>Expected Behavior</FormLabel>
            <Textarea
              placeholder="Describe the expected behavior"
              value={expectedBehavior}
              onChange={(e) => setExpectedBehavior(e.target.value)}
            />
          </FormControl>

          <FormControl mb={4} isRequired>
            <FormLabel>Actual Behavior</FormLabel>
            <Textarea
              placeholder="Describe the actual behavior"
              value={actualBehavior}
              onChange={(e) => setActualBehavior(e.target.value)}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Attach Documents</FormLabel>
            <Flex alignItems="center" wrap="wrap">
              {attachedDocuments.map((file, index) => {
                let fileIcon = <FaFileAlt />;
                if (file.type.includes("image")) {
                  fileIcon = <FaFileImage />;
                } else if (file.type.includes("pdf")) {
                  fileIcon = <FaFilePdf />;
                }
                return (
                  <Tooltip label={file.name} key={index}>
                    <Tag
                      size="lg"
                      borderRadius="full"
                      variant="solid"
                      colorScheme="gray"
                      mr={2}
                      mb={2}
                    >
                      {fileIcon}
                      <TagLabel ml={1}>
                        {file.name.substring(0, 15)}...
                      </TagLabel>
                      <TagCloseButton
                        onClick={() => handleRemoveDocument(index)}
                      />
                    </Tag>
                  </Tooltip>
                );
              })}
              <input
                type="file"
                multiple
                hidden
                id="file-upload"
                onChange={(e) =>
                  setAttachedDocuments([
                    ...attachedDocuments,
                    ...Array.from(e.target.files),
                  ])
                }
              />
              <label htmlFor="file-upload">
                <IconButton
                  as="span"
                  icon={<FiPlus />}
                  aria-label="Attach Document"
                  colorScheme="gray"
                  variant="outline"
                  cursor="pointer"
                />
              </label>
            </Flex>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="gray" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="purple" onClick={handleSubmit}>
            Add Issue
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default AddIssueModal;

AddIssueModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAddIssue: PropTypes.func.isRequired,
  defaultProjectId: PropTypes.string, // New prop for default project ID
};
