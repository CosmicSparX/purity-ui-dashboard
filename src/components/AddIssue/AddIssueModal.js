import React, { useState } from "react";
import PropTypes from "prop-types";
import {
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

function AddIssueModal({ isOpen, onClose, onAddIssue }) {
  const [issueName, setIssueName] = useState("");
  const [description, setDescription] = useState("");
  const [project, setProject] = useState("");
  const [status, setStatus] = useState("Open");
  const [priority, setPriority] = useState("Medium");
  const [type, setType] = useState("Bug");
  const [assignedTo, setAssignedTo] = useState("");
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
      type,
      assignedTo,
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
    setStatus("Open");
    setPriority("Medium");
    setType("Bug");
    setAssignedTo("");
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
            <Input
              placeholder="Enter project name"
              value={project}
              onChange={(e) => setProject(e.target.value)}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Status</FormLabel>
            <Select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Closed">Closed</option>
            </Select>
          </FormControl>

          <FormControl mb={4}>
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

          <FormControl mb={4}>
            <FormLabel>Type</FormLabel>
            <Select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="Bug">Bug</option>
              <option value="Feature">Feature</option>
              <option value="Improvement">Improvement</option>
              <option value="Performance">Performance</option>
            </Select>
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Assigned To</FormLabel>
            <Input
              placeholder="Enter assigned developer (optional)"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
            />
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
};
